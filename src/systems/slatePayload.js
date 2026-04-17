const GAME_VERSION = "v0.1.0";

export function buildSlatePayload(session) {
  return {
    game_academic_interest: session.academicInterest,
    game_version: GAME_VERSION,
    game_session_id: session.gameSessionId,
    game_completed_at: session.completedAt,
  };
}

export function buildSlateQuery(payload) {
  return new URLSearchParams(payload).toString();
}

export function buildSlateHref(session) {
  const slateUrl = import.meta.env.VITE_SLATE_URL;

  if (!slateUrl) {
    return null;
  }

  const url = new URL(slateUrl, window.location.href);
  const payload = buildSlatePayload(session);

  Object.entries(payload).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

export function getGameVersion() {
  return GAME_VERSION;
}
