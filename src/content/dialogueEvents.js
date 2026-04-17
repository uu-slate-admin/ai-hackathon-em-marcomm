export const dialogueEvents = {
  union_plaza: {
    title: "Student Union Plaza",
    body: "The center of campus is buzzing. Clubs are setting up, music is drifting through the air, and students are inviting people into spaces where they can belong fast.",
    prompt: "What pulls you in first?",
    options: [
      {
        id: "union_lead",
        label: "Join the teams creating the energy",
        description: "You want to build communities, events, and momentum.",
        reaction: "Swoop perks up. This path points toward leadership and shared purpose.",
        interestWeights: {
          business_community_leadership: 3,
          arts_media_storytelling: 1,
        },
        growthPoints: 1,
      },
      {
        id: "union_find_people",
        label: "Find the groups that make campus feel like home",
        description: "You care about support systems and real belonging.",
        reaction: "Swoop nudges closer. You noticed the people-first side of campus.",
        interestWeights: {
          health_human_sciences: 2,
          business_community_leadership: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  library_walk: {
    title: "Library Walk",
    body: "Study groups spill onto the path outside the library. Screens glow, ideas move fast, and the line between questions and inventions feels thin.",
    prompt: "How do you want to spend your time here?",
    options: [
      {
        id: "library_make",
        label: "Prototype the ideas that could change something real",
        description: "You like turning questions into systems, builds, and solutions.",
        reaction: "Swoop cracks the shell a little wider. Curiosity is becoming motion.",
        interestWeights: {
          engineering_technology: 3,
        },
        growthPoints: 1,
      },
      {
        id: "library_story",
        label: "Follow the stories hidden inside research and people",
        description: "You want to understand ideas deeply and communicate them clearly.",
        reaction: "Swoop tilts its head. You noticed the human meaning inside the data.",
        interestWeights: {
          arts_media_storytelling: 2,
          health_human_sciences: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  innovation_hub: {
    title: "Innovation Hub",
    body: "Labs, project rooms, and studio spaces are all colliding here. Teams are building, testing, revising, and pitching future-facing ideas.",
    prompt: "Which part of that energy feels most like you?",
    options: [
      {
        id: "hub_build",
        label: "The design-build cycle",
        description: "You like making ideas tangible and iterating until they work.",
        reaction: "Swoop fully hatches. Momentum suits you.",
        interestWeights: {
          engineering_technology: 3,
          business_community_leadership: 1,
        },
        growthPoints: 1,
      },
      {
        id: "hub_pitch",
        label: "The people, stories, and strategy behind what gets built",
        description: "You see how communication and leadership move ideas forward.",
        reaction: "Swoop stretches new wings. You followed the spark behind the build.",
        interestWeights: {
          business_community_leadership: 2,
          arts_media_storytelling: 2,
        },
        growthPoints: 1,
      },
    ],
  },
  health_commons: {
    title: "Health Commons Garden",
    body: "Students are meeting in a calm courtyard beside health and support spaces. The pace shifts. It feels grounded, intentional, and deeply connected to people.",
    prompt: "What stands out most here?",
    options: [
      {
        id: "health_support",
        label: "The chance to help people feel stronger and more supported",
        description: "You are drawn to care, growth, and human wellbeing.",
        reaction: "Swoop settles into your orbit. This path is steady and people-centered.",
        interestWeights: {
          health_human_sciences: 3,
        },
        growthPoints: 1,
      },
      {
        id: "health_systems",
        label: "The systems that help entire communities thrive",
        description: "You think about health as something built at scale.",
        reaction: "Swoop steadies itself. You see how support can become structure.",
        interestWeights: {
          health_human_sciences: 2,
          business_community_leadership: 1,
          engineering_technology: 1,
        },
        growthPoints: 1,
      },
    ],
  },
  skyline_terrace: {
    title: "Skyline Terrace",
    body: "From here, campus opens into the city and the mountains beyond it. The view feels like possibility: close to opportunity, wide enough for ambition.",
    prompt: "What does this moment make you think about?",
    options: [
      {
        id: "skyline_future",
        label: "What I can build with access to a bigger world",
        description: "You are thinking about trajectory, opportunity, and what comes next.",
        reaction: "Swoop rises higher. Your path is about momentum and scale.",
        interestWeights: {
          engineering_technology: 2,
          business_community_leadership: 2,
        },
        growthPoints: 1,
      },
      {
        id: "skyline_voice",
        label: "How place and perspective can shape the stories I tell",
        description: "You notice how environment changes expression and meaning.",
        reaction: "Swoop takes a confident glide. You turned the view into perspective.",
        interestWeights: {
          arts_media_storytelling: 3,
          business_community_leadership: 1,
        },
        growthPoints: 1,
      },
    ],
  },
};
