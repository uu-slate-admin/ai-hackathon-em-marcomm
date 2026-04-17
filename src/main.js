import Phaser from "phaser";

import "./styles.css";
import { academicInterestsById } from "./content/academicInterests";
import { collectibleItemsById } from "./content/collectibleItems";
import { locationTriggers } from "./content/locationTriggers";
import { BootScene } from "./scenes/BootScene";
import { CampusScene } from "./scenes/CampusScene";
import { TitleScene } from "./scenes/TitleScene";
import { getSession, resetSession, subscribeSession } from "./systems/sessionState";
import { mountDialogueOverlay } from "./ui/dialogueOverlay";
import { mountHud, updateHud } from "./ui/hud";
import { mountResultOverlay } from "./ui/resultOverlay";
import { createShell } from "./ui/shell";
import { mountTouchControls } from "./ui/touchControls";

const shell = createShell(document.querySelector("#app"));

mountHud({
  hudRoot: shell.hudRoot,
  missionRoot: shell.missionRoot,
  collectiblesRoot: shell.collectiblesRoot,
  totalStops: locationTriggers.length,
  academicInterestsById,
  collectibleItemsById,
});
mountDialogueOverlay(shell.dialogueLayer);
mountResultOverlay(shell.resultLayer);
mountTouchControls(shell.touchControlsRoot);

subscribeSession((session) => {
  updateHud({
    session,
    mode: session.completedAt ? "results" : "play",
  });
});

resetSession();
updateHud({
  session: getSession(),
  mode: "title",
  nearbyTrigger: null,
});

new Phaser.Game({
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
