import Phaser from "phaser";

import { drawTitleBackdrop } from "../game/drawBackdrop";
import { updateHud } from "../ui/hud";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    drawTitleBackdrop(this);
    updateHud({ mode: "title", nearbyTrigger: null });

    const { width, height } = this.scale;

    this.add
      .text(width * 0.08, height * 0.18, "GEARED TO RISE", {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "24px",
        color: "#f9eedd",
      })
      .setAlpha(0.8);

    this.add
      .text(width * 0.08, height * 0.28, "EXPLORE\nWITH SWOOP", {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "84px",
        color: "#ffffff",
        lineSpacing: 8,
      })
      .setOrigin(0, 0);

    this.add
      .text(
        width * 0.08,
        height * 0.56,
        "Walk the University of Utah campus, unlock landmark moments, and help Swoop grow into the next stage.",
        {
          fontFamily: "Trebuchet MS, sans-serif",
          fontSize: "28px",
          color: "#f3efe6",
          wordWrap: { width: width * 0.42 },
          lineSpacing: 10,
        },
      )
      .setOrigin(0, 0);

    const button = this.add.container(width * 0.17, height * 0.78);
    const buttonShape = this.add.rectangle(0, 0, 320, 94, 0xbe0000, 1).setOrigin(0.5);
    const buttonText = this.add
      .text(0, 0, "START THE TOUR", {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "30px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    button.add([buttonShape, buttonText]);
    buttonShape.setInteractive({ useHandCursor: true });

    const startTour = () => {
      this.scene.start("CampusScene");
    };

    buttonShape.on("pointerdown", startTour);

    this.input.keyboard.on("keydown-ENTER", startTour);
    this.input.keyboard.on("keydown-SPACE", startTour);
  }
}
