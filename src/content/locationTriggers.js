import { tourStops } from "./tourStops";

export const locationTriggers = tourStops.map((stop) => ({
  id: stop.id,
  label: stop.label,
  shortLabel: stop.shortLabel,
  x: stop.x,
  y: stop.y,
  radius: stop.radius,
  dialogueEventId: stop.id,
  collectibleId: stop.collectible.id,
  color: stop.color,
}));

export const locationTriggersById = Object.fromEntries(
  locationTriggers.map((trigger) => [trigger.id, trigger]),
);
