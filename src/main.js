import Phaser from "phaser";

import "./styles.css";
import { locationTriggers } from "./content/locationTriggers";
import { REQUIRED_STOPS } from "./content/tourStops";
import { BootScene } from "./scenes/BootScene";
import { CampusScene } from "./scenes/CampusScene";
import { TitleScene } from "./scenes/TitleScene";
import { attachAudioGame } from "./systems/audioState";
import { getSession, resetSession, subscribeSession } from "./systems/sessionState";
import { loadBrandFonts } from "./theme/typography";
import { mountDialogueOverlay } from "./ui/dialogueOverlay";
import { mountHud, updateHud } from "./ui/hud";
import { mountProgramSelectorOverlay } from "./ui/programSelectorOverlay";
import { mountResultOverlay } from "./ui/resultOverlay";
import { createShell } from "./ui/shell";
import { mountTouchControls } from "./ui/touchControls";

const shell = createShell(document.querySelector("#app"));

mountHud({
  hudRoot: shell.hudRoot,
  missionRoot: shell.missionRoot,
  totalStops: locationTriggers.length,
  requiredStops: REQUIRED_STOPS,
});
mountProgramSelectorOverlay(shell.selectorLayer);
mountDialogueOverlay(shell.dialogueLayer);
mountResultOverlay(shell.resultLayer);
mountTouchControls(shell.touchControlsRoot);

subscribeSession((session) => {
  updateHud({
    session,
    mode: session.completedAt ? "results" : "play",
  });
});

async function bootstrap() {
  resetSession();
  updateHud({
    session: getSession(),
    mode: "title",
    nearbyTrigger: null,
  });

  await loadBrandFonts();

  const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent: shell.gameRoot,
    width: 1600,
    height: 900,
    backgroundColor: "#100808",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: [BootScene, TitleScene, CampusScene],
  });

  attachAudioGame(game);
}

bootstrap();
