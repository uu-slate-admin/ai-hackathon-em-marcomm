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
  const graphics = scene.add.graphics();

  graphics.fillStyle(COLORS.limestone, 1);
  graphics.fillRect(0, 0, mapScene.width, mapScene.height);

  graphics.fillStyle(COLORS.sunrise, 0.12);
  graphics.fillPoints(
    [
      new Phaser.Geom.Point(0, mapScene.height * 0.16),
      new Phaser.Geom.Point(mapScene.width * 0.26, 0),
      new Phaser.Geom.Point(mapScene.width * 0.54, 0),
      new Phaser.Geom.Point(mapScene.width * 0.3, mapScene.height * 0.24),
    ],
    true,
  );

  graphics.fillStyle(COLORS.lake, 0.11);
  graphics.fillPoints(
    [
      new Phaser.Geom.Point(mapScene.width * 0.74, mapScene.height),
      new Phaser.Geom.Point(mapScene.width, mapScene.height),
      new Phaser.Geom.Point(mapScene.width, mapScene.height * 0.7),
      new Phaser.Geom.Point(mapScene.width * 0.84, mapScene.height * 0.58),
      new Phaser.Geom.Point(mapScene.width * 0.62, mapScene.height * 0.8),
    ],
    true,
  );

  graphics.fillStyle(COLORS.red, 0.1);
  mapScene.paths.forEach((path) => {
    graphics.lineStyle(path.width, path.color, path.alpha);
    graphics.strokePoints(
      path.points.map((point) => new Phaser.Geom.Point(point.x, point.y)),
      false,
      false,
    );
  });

  graphics.lineStyle(4, COLORS.granite, 0.35);
  mapScene.paths.forEach((path) => {
    graphics.strokePoints(
      path.points.map((point) => new Phaser.Geom.Point(point.x, point.y)),
      false,
      false,
    );
  });

  graphics.lineStyle(2, COLORS.granite, 0.14);
  for (let index = 0; index < 11; index += 1) {
    graphics.strokePoints(
      [
        new Phaser.Geom.Point(60, 160 + index * 130),
        new Phaser.Geom.Point(mapScene.width * 0.22, 120 + index * 118),
        new Phaser.Geom.Point(mapScene.width * 0.54, 140 + index * 105),
        new Phaser.Geom.Point(mapScene.width - 70, 120 + index * 114),
      ],
      false,
      false,
    );
  }

  mapScene.decorations.forEach((decoration) => {
    graphics.fillStyle(decoration.color, decoration.alpha);
    graphics.fillPoints(
      decoration.points.map((point) => new Phaser.Geom.Point(point.x, point.y)),
      true,
    );
  });

  mapScene.buildings.forEach((building) => {
    const block = scene.add.rectangle(
      building.x,
      building.y,
      building.width,
      building.height,
      building.color,
      building.alpha,
    );
    block.setStrokeStyle(4, COLORS.obsidian, 0.12);
    block.setDepth(4);
    scene.add
      .text(building.x, building.y + building.height / 2 + 18, building.label, {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "20px",
        color: "#211616",
        align: "center",
      })
      .setOrigin(0.5, 0)
      .setDepth(4);
  });

  triggers.forEach((trigger) => {
    scene.add
      .text(trigger.x, trigger.y + 74, trigger.label, {
        fontFamily: "Arial Black, Impact, sans-serif",
        fontSize: "20px",
        color: "#241515",
        align: "center",
        wordWrap: { width: 180 },
      })
      .setOrigin(0.5, 0)
      .setDepth(6);
  });
}
