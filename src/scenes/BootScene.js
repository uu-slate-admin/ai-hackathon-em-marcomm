import Phaser from "phaser";

import { campusPhotoAssets, mapAsset, swoopStageAssets, titleHeroAsset } from "../content/media";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image(mapAsset.key, mapAsset.url);

    Object.values(swoopStageAssets).forEach((asset) => {
      this.load.image(asset.key, asset.url);
    });

    this.load.image(titleHeroAsset.key, titleHeroAsset.url);

    Object.values(campusPhotoAssets).forEach((asset) => {
      this.load.image(asset.key, asset.url);
    });
  }

  create() {
    this.createPlayerTexture();
    this.createLandmarkTexture();
    this.scene.start("TitleScene");
  }

  createPlayerTexture() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0xbe0000, 1);
    graphics.fillPoints(
      [
        new Phaser.Geom.Point(24, 0),
        new Phaser.Geom.Point(48, 24),
        new Phaser.Geom.Point(24, 48),
        new Phaser.Geom.Point(0, 24),
      ],
      true,
    );
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(16, 16, 16, 16);
    graphics.generateTexture("player-marker", 48, 48);
    graphics.clear();

    graphics.fillStyle(0xbe0000, 0.82);
    graphics.fillCircle(36, 36, 36);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(36, 36, 18);
    graphics.generateTexture("landmark-node", 72, 72);
    graphics.destroy();
  }

  createLandmarkTexture() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0xffffff, 1);
    graphics.fillPoints(
      [
        new Phaser.Geom.Point(28, 0),
        new Phaser.Geom.Point(56, 28),
        new Phaser.Geom.Point(28, 56),
        new Phaser.Geom.Point(0, 28),
      ],
      true,
    );
    graphics.generateTexture("landmark-core", 56, 56);
    graphics.destroy();
  }
}
