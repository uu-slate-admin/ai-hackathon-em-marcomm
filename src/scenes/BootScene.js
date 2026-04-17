import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  create() {
    this.createPlayerTexture();
    this.createSwoopTextures();
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

  createSwoopTextures() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    graphics.fillStyle(0xffffff, 1);
    graphics.lineStyle(4, 0xbe0000, 1);
    graphics.strokeEllipse(30, 34, 40, 52);
    graphics.fillEllipse(30, 34, 40, 52);
    graphics.generateTexture("swoop-egg", 60, 70);
    graphics.clear();

    graphics.fillStyle(0xbe0000, 1);
    graphics.fillCircle(36, 34, 18);
    graphics.fillStyle(0xffb81d, 1);
    graphics.fillTriangle(50, 34, 61, 39, 50, 44);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(25, 28, 6);
    graphics.generateTexture("swoop-hatchling", 72, 68);
    graphics.clear();

    graphics.fillStyle(0xbe0000, 1);
    graphics.fillCircle(40, 34, 19);
    graphics.fillStyle(0x3abfc0, 0.9);
    graphics.fillEllipse(24, 38, 22, 32);
    graphics.fillStyle(0xffb81d, 1);
    graphics.fillTriangle(58, 34, 72, 39, 58, 45);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(35, 28, 6);
    graphics.generateTexture("swoop-growing", 78, 72);
    graphics.clear();

    graphics.fillStyle(0xbe0000, 1);
    graphics.fillCircle(42, 34, 20);
    graphics.fillStyle(0x3abfc0, 1);
    graphics.fillEllipse(20, 34, 26, 34);
    graphics.fillEllipse(44, 12, 18, 12);
    graphics.fillStyle(0xffb81d, 1);
    graphics.fillTriangle(62, 34, 80, 39, 62, 46);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(36, 28, 6);
    graphics.generateTexture("swoop-adult", 86, 72);
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
