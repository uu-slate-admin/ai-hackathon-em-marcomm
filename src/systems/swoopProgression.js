export const swoopStages = [
  { id: "egg", label: "Egg", minPoints: 0 },
  { id: "hatchling", label: "Hatchling", minPoints: 1 },
  { id: "growing", label: "Growing", minPoints: 3 },
  { id: "adult", label: "Adult", minPoints: 5 },
];

export function resolveSwoopStage(points) {
  let resolvedStage = swoopStages[0];

  swoopStages.forEach((stage) => {
    if (points >= stage.minPoints) {
      resolvedStage = stage;
    }
  });

  return resolvedStage;
}
