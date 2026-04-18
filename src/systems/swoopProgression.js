export const swoopStages = [
  { id: "egg", label: "Egg", minPoints: 0 },
  { id: "baby", label: "Baby", minPoints: 1 },
  { id: "adolescent", label: "Adolescent", minPoints: 3 },
  { id: "teen", label: "Teen", minPoints: 4 },
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
