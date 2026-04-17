import Phaser from "phaser";

import { campusPhotoAssets, mapAsset, swoopStageAssets, titleHeroAsset } from "../content/media";

const GREAT_SALT_LAKE = 0x3abfc0;
const WASATCH_SUNRISE = 0xffb81d;
const MARKER_OUTLINE = 0xffffff;
const MARKER_INNER = 0xffffff;

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
    this.createLandmarkTextures();
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

    graphics.destroy();
  }

  createLandmarkTextures() {
    this.createLandmarkPulseTexture("landmark-node-unvisited", GREAT_SALT_LAKE);
    this.createLandmarkPulseTexture("landmark-node-visited", WASATCH_SUNRISE);
    this.createLandmarkPinTexture("landmark-core-unvisited", GREAT_SALT_LAKE);
    this.createLandmarkPinTexture("landmark-core-visited", WASATCH_SUNRISE);
  }

  createLandmarkPulseTexture(key, color) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(color, 0.22);
    graphics.fillCircle(38, 38, 30);
    graphics.lineStyle(4, color, 0.42);
    graphics.strokeCircle(38, 38, 24);
    graphics.generateTexture(key, 76, 76);
    graphics.destroy();
  }

  createLandmarkPinTexture(key, color) {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    const pinPath = new Phaser.Curves.Path(32, 6);

    pinPath.splineTo([
      48, 6,
      58, 18,
      58, 31,
      58, 45,
      45, 55,
      32, 66,
      19, 55,
      6, 45,
      6, 31,
      6, 18,
      16, 6,
      32, 6,
    ]);

    graphics.fillStyle(color, 1);
    graphics.lineStyle(4, MARKER_OUTLINE, 0.98);
    pinPath.draw(graphics);
    graphics.fillPoints(pinPath.getPoints(48), true);
    graphics.strokePoints(pinPath.getPoints(48), true);

    graphics.fillStyle(MARKER_INNER, 1);
    graphics.fillCircle(32, 29, 10);
    graphics.generateTexture(key, 64, 72);
    graphics.destroy();
  }
}
