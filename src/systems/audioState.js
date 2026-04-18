import { audioAssets } from "../content/media";

const STORAGE_KEY = "uofu-campus-audio-settings";
const DEFAULT_SETTINGS = {
  musicMuted: false,
  musicVolume: 0.45,
  sfxMuted: false,
};
const SFX_NORMALIZATION_GAIN = 1.45;

const subscribers = new Set();

let settings = loadSettings();
let gameRef = null;
let musicRef = null;

function clampVolume(volume) {
  return Math.max(0, Math.min(1, Number.isFinite(volume) ? volume : DEFAULT_SETTINGS.musicVolume));
}

function loadSettings() {
  if (typeof window === "undefined") {
    return { ...DEFAULT_SETTINGS };
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsed = JSON.parse(rawValue);
    return {
      musicMuted: Boolean(parsed.musicMuted),
      musicVolume: clampVolume(parsed.musicVolume),
      sfxMuted: Boolean(parsed.sfxMuted),
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function persistSettings() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage failures so audio still works during the session.
  }
}

function notifySubscribers() {
  const snapshot = getAudioSettings();
  subscribers.forEach((subscriber) => subscriber(snapshot));
}

function ensureMusic() {
  const soundManager = gameRef?.sound;

  if (!soundManager) {
    return null;
  }

  const existingSound = soundManager.get(audioAssets.music.background.key);
  musicRef = existingSound ?? soundManager.add(audioAssets.music.background.key, { loop: true });
  return musicRef;
}

function syncMusicSettings() {
  const music = ensureMusic();

  if (!music) {
    return;
  }

  music.setVolume(settings.musicVolume);
}

export function attachAudioGame(game) {
  gameRef = game;
  syncMusicSettings();
}

export function getAudioSettings() {
  return { ...settings };
}

export function subscribeAudioSettings(subscriber) {
  subscribers.add(subscriber);
  subscriber(getAudioSettings());

  return () => {
    subscribers.delete(subscriber);
  };
}

export function setMusicMuted(musicMuted) {
  settings = {
    ...settings,
    musicMuted: Boolean(musicMuted),
  };
  persistSettings();
  syncMusicSettings();

  const music = ensureMusic();

  if (settings.musicMuted) {
    if (music?.isPlaying) {
      music.pause();
    }
  } else {
    startBackgroundMusic();
  }

  notifySubscribers();
}

export function toggleMusicMuted() {
  setMusicMuted(!settings.musicMuted);
}

export function setSfxMuted(sfxMuted) {
  settings = {
    ...settings,
    sfxMuted: Boolean(sfxMuted),
  };
  persistSettings();
  notifySubscribers();
}

export function toggleSfxMuted() {
  setSfxMuted(!settings.sfxMuted);
}

export function setMusicVolume(musicVolume) {
  settings = {
    ...settings,
    musicVolume: clampVolume(musicVolume),
  };
  persistSettings();
  syncMusicSettings();

  if (!settings.musicMuted && settings.musicVolume > 0) {
    startBackgroundMusic();
  }

  notifySubscribers();
}

export function startBackgroundMusic() {
  const music = ensureMusic();

  if (!music || settings.musicMuted) {
    return;
  }

  syncMusicSettings();

  try {
    if (music.isPaused) {
      music.resume();
      return;
    }

    if (music.isPlaying) {
      return;
    }

    music.play();
  } catch {
    // Some browsers block playback until a gesture. A later gesture can retry.
  }
}

export function playSoundEffect(key, config = {}) {
  const soundManager = gameRef?.sound;

  if (!soundManager || settings.sfxMuted) {
    return;
  }

  const requestedVolume = Number.isFinite(config.volume) ? config.volume : 1;
  const volume = clampVolume(requestedVolume * SFX_NORMALIZATION_GAIN);

  if (volume <= 0) {
    return;
  }

  soundManager.play(key, {
    ...config,
    volume,
  });
}
