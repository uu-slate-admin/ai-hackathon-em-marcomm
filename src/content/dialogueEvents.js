import { campusPhotoAssets } from "./media";

export const dialogueEvents = {
  undergraduate_studies: {
    title: "Undergraduate Studies",
    image: campusPhotoAssets.undergraduateStudies.url,
    body: "A counselor points toward the many directions a Utah education can take. The question is not whether there is a path for you here. It is which path you want to start exploring first.",
    prompt: "What do you want your first academic move to feel like?",
    options: [
      {
        id: "undergrad_build",
        label: "Hands-on, future-facing, and problem-solving",
        description: "You want to turn curiosity into builds, research, and real systems.",
        reaction: "Swoop leans in. That instinct points toward a builder's path.",
        interestWeights: {
          engineering_technology: 3,
          health_human_sciences: 1,
        },
        growthPoints: 1,
      },
      {
        id: "undergrad_people",
        label: "Flexible, creative, and driven by people",
        description: "You want room to shape ideas, stories, and community impact.",
        reaction: "Swoop perks up. You are following the human side of possibility.",
        interestWeights: {
          arts_media_storytelling: 2,
          business_community_leadership: 2,
        },
        growthPoints: 1,
      },
    ],
  },
  student_services: {
    title: "Student Services Building",
    image: campusPhotoAssets.studentServices.url,
    body: "Staff here talk about scholarships, advising, and the kind of support that helps students move from interest to action without feeling lost in the process.",
    prompt: "Which part of that support matters most to you?",
    options: [
      {
        id: "services_afford",
        label: "Knowing the path is practical and financially possible",
        description: "You want the plan behind the dream to make sense.",
        reaction: "Swoop settles in. A good path needs real support behind it.",
        interestWeights: {
          business_community_leadership: 2,
          engineering_technology: 1,
        },
        growthPoints: 1,
      },
      {
        id: "services_belong",
        label: "Having people, guidance, and care around you",
        description: "You want a campus that helps you feel supported while you grow.",
        reaction: "Swoop relaxes. You noticed how support changes the whole experience.",
        interestWeights: {
          health_human_sciences: 3,
          arts_media_storytelling: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  transportation_hub: {
    title: "Campus Transit",
    image: campusPhotoAssets.transportation.url,
    body: "At the TRAX stop, the city suddenly feels close. Your student ID opens up transit across campus and beyond, turning daily movement into access, independence, and possibility.",
    prompt: "What feels most exciting about that?",
    options: [
      {
        id: "transit_city",
        label: "Using the city as part of your education",
        description: "You are thinking about internships, arts, food, and opportunities beyond the classroom.",
        reaction: "Swoop looks outward. You noticed how movement can widen your world.",
        interestWeights: {
          business_community_leadership: 2,
          arts_media_storytelling: 1,
        },
        growthPoints: 1,
      },
      {
        id: "transit_routine",
        label: "A smoother day-to-day life on a connected campus",
        description: "You like systems that make it easier to keep moving.",
        reaction: "Swoop speeds up. You are paying attention to how a campus works.",
        interestWeights: {
          engineering_technology: 2,
          health_human_sciences: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  rice_eccles: {
    title: "Rice-Eccles Stadium",
    image: campusPhotoAssets.riceEccles.url,
    body: "Game day energy spills across campus. School spirit here is not just about sports. It is about showing up, belonging to something bigger, and sharing momentum with everyone around you.",
    prompt: "What part of that energy feels most like you?",
    options: [
      {
        id: "rice_people",
        label: "The feeling of community and shared momentum",
        description: "You are drawn to teams, leadership, and campus traditions.",
        reaction: "Swoop lifts its wings. You found the pulse that brings people together.",
        interestWeights: {
          business_community_leadership: 3,
        },
        growthPoints: 1,
      },
      {
        id: "rice_story",
        label: "How a big moment can become a memory and a story",
        description: "You notice the atmosphere, visuals, and emotion around the experience.",
        reaction: "Swoop turns toward the crowd. You followed the feeling behind the moment.",
        interestWeights: {
          arts_media_storytelling: 2,
          health_human_sciences: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  red_butte: {
    title: "Red Butte Garden",
    image: campusPhotoAssets.redButte.url,
    body: "The trails open into a wider view of Salt Lake City and the mountains beyond. It feels like a reminder that campus life here is tied to the outdoors, the landscape, and room to breathe.",
    prompt: "What does this stop make you want more of?",
    options: [
      {
        id: "red_butte_balance",
        label: "A life that stays grounded, healthy, and connected to place",
        description: "You want a campus experience that supports wellbeing and perspective.",
        reaction: "Swoop slows down and takes it in. You found the calm inside the momentum.",
        interestWeights: {
          health_human_sciences: 2,
          arts_media_storytelling: 1,
        },
        growthPoints: 1,
      },
      {
        id: "red_butte_adventure",
        label: "A campus that keeps opening into adventure and discovery",
        description: "You are energized by access, movement, and what else might be out there.",
        reaction: "Swoop glides forward. You followed the part of campus that keeps expanding.",
        interestWeights: {
          engineering_technology: 2,
          business_community_leadership: 1,
        },
        growthPoints: 1,
      },
    ],
  },
};
