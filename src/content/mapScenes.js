export const campusScene = {
  id: "campus_core",
  width: 2800,
  height: 1800,
  playerStart: {
    x: 280,
    y: 1350,
  },
  buildings: [
    { x: 340, y: 300, width: 360, height: 230, label: "Stadium Row", color: 0xc9c0b3, alpha: 0.8 },
    { x: 460, y: 1180, width: 300, height: 220, label: "Union", color: 0xd9d0c5, alpha: 0.86 },
    { x: 1080, y: 840, width: 330, height: 240, label: "Library", color: 0xd3cabf, alpha: 0.86 },
    { x: 1610, y: 620, width: 360, height: 260, label: "Innovation", color: 0xd7d0c6, alpha: 0.86 },
    { x: 2040, y: 1260, width: 400, height: 240, label: "Arts + Support", color: 0xd0c6bb, alpha: 0.84 },
    { x: 2280, y: 910, width: 330, height: 240, label: "Health", color: 0xd4ccc1, alpha: 0.84 },
  ],
  obstacles: [
    { x: 340, y: 300, width: 390, height: 250 },
    { x: 460, y: 1180, width: 330, height: 240 },
    { x: 1080, y: 840, width: 360, height: 260 },
    { x: 1610, y: 620, width: 390, height: 280 },
    { x: 2040, y: 1260, width: 430, height: 260 },
    { x: 2280, y: 910, width: 360, height: 260 },
    { x: 2580, y: 220, width: 280, height: 360 },
    { x: 1380, y: 1460, width: 520, height: 180 },
  ],
  paths: [
    {
      width: 44,
      color: 0xffffff,
      alpha: 0.32,
      points: [
        { x: 120, y: 1390 },
        { x: 420, y: 1320 },
        { x: 820, y: 1040 },
        { x: 1180, y: 940 },
        { x: 1650, y: 760 },
        { x: 2100, y: 1110 },
        { x: 2450, y: 540 },
      ],
    },
    {
      width: 28,
      color: 0xffb81d,
      alpha: 0.18,
      points: [
        { x: 220, y: 1560 },
        { x: 530, y: 1240 },
        { x: 1080, y: 980 },
        { x: 1590, y: 760 },
        { x: 2380, y: 520 },
      ],
    },
    {
      width: 22,
      color: 0x3abfc0,
      alpha: 0.18,
      points: [
        { x: 540, y: 1240 },
        { x: 760, y: 1380 },
        { x: 1440, y: 1500 },
        { x: 2070, y: 1120 },
      ],
    },
  ],
  decorations: [
    {
      color: 0xbe0000,
      alpha: 0.09,
      points: [
        { x: 1880, y: 0 },
        { x: 2640, y: 0 },
        { x: 2320, y: 340 },
        { x: 1700, y: 220 },
      ],
    },
    {
      color: 0x3abfc0,
      alpha: 0.08,
      points: [
        { x: 0, y: 1660 },
        { x: 580, y: 1480 },
        { x: 980, y: 1800 },
        { x: 0, y: 1800 },
      ],
    },
  ],
};
