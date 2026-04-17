import { tourStops } from "./tourStops";

export const collectibleItems = tourStops.map((stop) => stop.collectible);

export const collectibleItemsById = Object.fromEntries(
  collectibleItems.map((item) => [item.id, item]),
);
