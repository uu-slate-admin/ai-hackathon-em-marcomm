export const academicInterests = [
  {
    id: "engineering_technology",
    label: "Engineering + Technology",
    headline: "Build What Comes Next",
    summary:
      "You gravitated toward spaces where ideas become systems, prototypes, and real-world impact.",
    nextStep:
      "Explore programs that connect design thinking, research, and industry-ready problem solving.",
  },
  {
    id: "health_human_sciences",
    label: "Health + Human Sciences",
    headline: "Lead Through Care",
    summary:
      "Your choices pointed toward people-centered work, wellness, support, and solving challenges that improve lives.",
    nextStep:
      "Look at programs connected to health, human development, and community wellbeing.",
  },
  {
    id: "arts_media_storytelling",
    label: "Arts + Media Storytelling",
    headline: "Shape Culture In Motion",
    summary:
      "You kept choosing places where expression, communication, and perspective can turn into influence.",
    nextStep:
      "Dig into programs tied to media, design, storytelling, and creative production.",
  },
  {
    id: "business_community_leadership",
    label: "Business + Community Leadership",
    headline: "Move People Forward",
    summary:
      "Your path emphasized connection, initiative, and opportunities where leadership creates momentum for others.",
    nextStep:
      "Explore programs focused on entrepreneurship, organizations, policy, and community impact.",
  },
];

export const academicInterestsById = Object.fromEntries(
  academicInterests.map((interest) => [interest.id, interest]),
);
