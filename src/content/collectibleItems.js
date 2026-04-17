export const collectibleItems = [
  {
    id: "union_pin",
    label: "Union Pin",
    unlockCopy: "A keepsake from the pulse of campus life.",
  },
  {
    id: "research_patch",
    label: "Research Patch",
    unlockCopy: "Proof you followed curiosity into discovery.",
  },
  {
    id: "city_postcard",
    label: "City Postcard",
    unlockCopy: "A reminder that campus and city move together.",
  },
  {
    id: "granite_pass",
    label: "Granite Pass",
    unlockCopy: "You unlocked a path shaped by support and resilience.",
  },
  {
    id: "launch_badge",
    label: "Launch Badge",
    unlockCopy: "A marker for ambition and momentum.",
  },
];

export const collectibleItemsById = Object.fromEntries(
  collectibleItems.map((item) => [item.id, item]),
);
