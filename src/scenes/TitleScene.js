import Phaser from "phaser";

import { titleGalleryPhotos, titleHeroAsset } from "../content/media";
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

    const photoLayouts = [
      { x: width * 0.73, y: height * 0.2, width: 250, height: 154, rotation: -0.1, asset: titleGalleryPhotos[0] },
      { x: width * 0.88, y: height * 0.26, width: 240, height: 148, rotation: 0.08, asset: titleGalleryPhotos[1] },
      { x: width * 0.8, y: height * 0.43, width: 270, height: 164, rotation: -0.04, asset: titleGalleryPhotos[2] },
      { x: width * 0.93, y: height * 0.52, width: 225, height: 138, rotation: 0.11, asset: titleGalleryPhotos[3] },
      { x: width * 0.68, y: height * 0.56, width: 240, height: 148, rotation: -0.08, asset: titleGalleryPhotos[4] },
    ];

    photoLayouts.forEach((card) => this.addPhotoCard(card));

    this.add
      .image(width * 0.77, height * 0.72, titleHeroAsset.key)
      .setDisplaySize(250, 320)
      .setDepth(6);

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
        "Ready to explore the University of Utah and forge your own path? Walk the campus, unlock landmark moments, and help Swoop grow as you go.",
        {
          fontFamily: "Trebuchet MS, sans-serif",
          fontSize: "28px",
          color: "#f3efe6",
          wordWrap: { width: width * 0.4 },
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

  addPhotoCard({ x, y, width, height, rotation, asset }) {
    const frame = this.add.container(x, y).setRotation(rotation).setDepth(4);
    const shadow = this.add.rectangle(12, 12, width, height, 0x000000, 0.28).setOrigin(0.5);
    const border = this.add.rectangle(0, 0, width, height, 0xf3efe6, 1).setOrigin(0.5);
    const image = this.add.image(0, 0, asset.key).setDisplaySize(width - 18, height - 18);
    const label = this.add.text(-width / 2 + 16, height / 2 - 34, asset.label, {
      fontFamily: "Arial Black, Impact, sans-serif",
      fontSize: "14px",
      color: "#120809",
    });

    frame.add([shadow, border, image, label]);
  }
}
