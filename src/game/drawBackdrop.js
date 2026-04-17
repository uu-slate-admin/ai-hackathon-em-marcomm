import Phaser from "phaser";

const COLORS = {
  red: 0xbe0000,
  redDark: 0x890000,
  limestone: 0xf3efe6,
  sunrise: 0xffb81d,
  lake: 0x3abfc0,
  obsidian: 0x120809,
  granite: 0x708e99,
};

export function drawTitleBackdrop(scene) {
  const { width, height } = scene.scale;
  const graphics = scene.add.graphics();

  graphics.fillStyle(COLORS.obsidian, 1);
  graphics.fillRect(0, 0, width, height);

  graphics.fillStyle(COLORS.redDark, 0.85);
  graphics.fillPoints(
    [
      new Phaser.Geom.Point(0, height * 0.28),
      new Phaser.Geom.Point(width * 0.42, height * 0.08),
      new Phaser.Geom.Point(width * 0.58, height * 0.28),
      new Phaser.Geom.Point(width * 0.16, height * 0.42),
    ],
    true,
  );

  graphics.fillStyle(COLORS.sunrise, 0.12);
  graphics.fillPoints(
    [
      new Phaser.Geom.Point(width * 0.72, 0),
      new Phaser.Geom.Point(width, 0),
      new Phaser.Geom.Point(width, height * 0.4),
      new Phaser.Geom.Point(width * 0.78, height * 0.54),
      new Phaser.Geom.Point(width * 0.62, height * 0.32),
    ],
    true,
  );

  graphics.fillStyle(COLORS.lake, 0.08);
  graphics.fillPoints(
    [
      new Phaser.Geom.Point(0, height),
      new Phaser.Geom.Point(0, height * 0.72),
      new Phaser.Geom.Point(width * 0.22, height * 0.62),
      new Phaser.Geom.Point(width * 0.38, height * 0.72),
      new Phaser.Geom.Point(width * 0.28, height),
    ],
    true,
  );

  graphics.lineStyle(2, COLORS.limestone, 0.08);
  for (let index = 0; index < 8; index += 1) {
    const inset = 48 + index * 36;
    graphics.strokePoints(
      [
        new Phaser.Geom.Point(inset, height - inset * 0.8),
        new Phaser.Geom.Point(width * 0.28, height * 0.55 - index * 10),
        new Phaser.Geom.Point(width * 0.55, height * 0.58 - index * 6),
        new Phaser.Geom.Point(width - inset, height * 0.34 + index * 4),
      ],
      false,
      false,
    );
  }
}

export function drawCampusMap(scene, mapScene, triggers) {
  scene.add.image(0, 0, mapScene.backgroundKey).setOrigin(0).setDepth(0);

  scene.add
    .rectangle(mapScene.width / 2, mapScene.height / 2, mapScene.width, mapScene.height, 0xf3efe6, 0.06)
    .setDepth(1);

  triggers.forEach((trigger) => {
    scene.add
      .text(trigger.x, trigger.y + 74, trigger.label, {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "22px",
        color: "#140d0d",
        align: "center",
        wordWrap: { width: 220 },
        stroke: "#f3efe6",
        strokeThickness: 5,
      })
      .setOrigin(0.5, 0)
      .setDepth(6);
  });
}
