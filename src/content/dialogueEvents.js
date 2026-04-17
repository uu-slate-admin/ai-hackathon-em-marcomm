import { campusPhotoAssets } from "./media";
import { tourStops } from "./tourStops";

export const dialogueEvents = Object.fromEntries(
  tourStops.map((stop) => [
    stop.id,
    {
      title: stop.label,
      image: campusPhotoAssets[stop.imageAsset]?.url,
      body: stop.body,
      prompt: stop.prompt,
      options: stop.options,
    },
  ]),
);
