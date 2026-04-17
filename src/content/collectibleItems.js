export const collectibleItems = [
  {
    id: "major-map",
    label: "Major Map",
    unlockCopy: "A keepsake from the moment your options started to take shape.",
  },
  {
    id: "support-badge",
    label: "Support Badge",
    unlockCopy: "A reminder that the right support changes the whole journey.",
  },
  {
    id: "transit-pass",
    label: "Transit Pass",
    unlockCopy: "Proof that campus and city are both part of your route.",
  },
  {
    id: "stadium-pennant",
    label: "Stadium Pennant",
    unlockCopy: "A marker for the energy and tradition that pull people together.",
  },
  {
    id: "trail-postcard",
    label: "Trail Postcard",
    unlockCopy: "A snapshot of the wider landscape waiting just past campus.",
  },
];

export const collectibleItemsById = Object.fromEntries(
  collectibleItems.map((item) => [item.id, item]),
);
