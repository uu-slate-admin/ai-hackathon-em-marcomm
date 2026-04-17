export const REQUIRED_STOPS = 5;

const COLORS = {
  red: 0xbe0000,
  sunrise: 0xffb81d,
  lake: 0x3abfc0,
  granite: 0x708e99,
  ember: 0x890000,
};

function createOption(id, label, description, interestWeights) {
  return {
    id,
    label,
    description,
    reaction: "Swoop nods. That instinct is shaping your path.",
    interestWeights,
    growthPoints: 1,
  };
}

function createCollectible(id, label) {
  return {
    id: `${id}-stamp`,
    label: `${label} Stamp`,
    unlockCopy: `A tour stamp from ${label}.`,
  };
}

function academicOptions(id) {
  return [
    createOption(
      `${id}_build`,
      "Build ideas into something real",
      "You are drawn to research, systems, and problem-solving.",
      { engineering_technology: 3, business_community_leadership: 1 },
    ),
    createOption(
      `${id}_people`,
      "Use what you learn to support people",
      "You care most about impact, wellbeing, and helping communities.",
      { health_human_sciences: 2, arts_media_storytelling: 1 },
    ),
  ];
}

function creativeOptions(id) {
  return [
    createOption(
      `${id}_make`,
      "Create work people can see and feel",
      "You notice design, story, and expression first.",
      { arts_media_storytelling: 3, business_community_leadership: 1 },
    ),
    createOption(
      `${id}_lead`,
      "Turn creativity into influence",
      "You are thinking about audiences, leadership, and momentum.",
      { business_community_leadership: 2, arts_media_storytelling: 1 },
    ),
  ];
}

function supportOptions(id) {
  return [
    createOption(
      `${id}_care`,
      "Feeling supported and set up to thrive",
      "You want guidance, safety, and practical help around you.",
      { health_human_sciences: 3, business_community_leadership: 1 },
    ),
    createOption(
      `${id}_access`,
      "Knowing opportunity is within reach",
      "You value systems that make campus easier to navigate.",
      { business_community_leadership: 2, engineering_technology: 1 },
    ),
  ];
}

function campusLifeOptions(id) {
  return [
    createOption(
      `${id}_belong`,
      "Finding your people and your place",
      "You are paying attention to community and shared momentum.",
      { business_community_leadership: 3, health_human_sciences: 1 },
    ),
    createOption(
      `${id}_energy`,
      "A campus experience with movement and variety",
      "You want college life to feel active, memorable, and alive.",
      { arts_media_storytelling: 2, business_community_leadership: 1 },
    ),
  ];
}

function outdoorsOptions(id) {
  return [
    createOption(
      `${id}_balance`,
      "A campus life with room to breathe",
      "You want wellbeing, perspective, and connection to place.",
      { health_human_sciences: 2, arts_media_storytelling: 1 },
    ),
    createOption(
      `${id}_adventure`,
      "A launch point for bigger adventures",
      "You are energized by movement, access, and discovery.",
      { engineering_technology: 2, business_community_leadership: 1 },
    ),
  ];
}

function globalOptions(id) {
  return [
    createOption(
      `${id}_world`,
      "Seeing your future on a wider map",
      "Global experiences and different perspectives matter to you.",
      { arts_media_storytelling: 2, business_community_leadership: 2 },
    ),
    createOption(
      `${id}_path`,
      "Keeping your options open across disciplines",
      "You like a path that can stretch across places and ideas.",
      { engineering_technology: 1, health_human_sciences: 1, arts_media_storytelling: 1 },
    ),
  ];
}

export const tourStops = [
  {
    id: "block_u",
    label: "Block U",
    shortLabel: "Block U",
    x: 1695,
    y: 560,
    radius: 120,
    color: COLORS.red,
    imageAsset: "blockU",
    collectible: createCollectible("block_u", "Block U"),
    body:
      "At Block U, the tour opens with the same idea captured in the source material: your path is not chosen for you, it is built by you. This is where curiosity turns into direction.",
    prompt: "What do you want this tour to help you discover?",
    options: globalOptions("block_u"),
  },
  {
    id: "uac",
    label: "U Asia Campus",
    shortLabel: "UAC",
    x: 990,
    y: 470,
    radius: 115,
    color: COLORS.lake,
    imageAsset: "uac",
    collectible: createCollectible("uac", "U Asia Campus"),
    body:
      "The U's global footprint expands what college can look like. This stop reflects the tour's emphasis on global experiences and the idea that your Utah story can connect to a much wider world.",
    prompt: "What part of that global reach stands out most?",
    options: globalOptions("uac"),
  },
  {
    id: "umfa",
    label: "UMFA",
    shortLabel: "UMFA",
    x: 1360,
    y: 470,
    radius: 115,
    color: COLORS.sunrise,
    imageAsset: "umfa",
    collectible: createCollectible("umfa", "UMFA"),
    body:
      "UMFA signals how the university connects learning with art, culture, and public-facing creativity. It is a reminder that expression and perspective are part of campus life too.",
    prompt: "What are you most drawn to here?",
    options: creativeOptions("umfa"),
  },
  {
    id: "kahlert_village",
    label: "Kahlert Village",
    shortLabel: "Kahlert",
    x: 2160,
    y: 700,
    radius: 120,
    color: COLORS.granite,
    imageAsset: "kahlertVillage",
    collectible: createCollectible("kahlert_village", "Kahlert Village"),
    body:
      "The housing tour object makes this clear: first-year students are guaranteed on-campus housing, and living here helps people build community and network early.",
    prompt: "What matters most about where you live?",
    options: supportOptions("kahlert_village"),
  },
  {
    id: "honors_housing",
    label: "Honors Housing",
    shortLabel: "Honors",
    x: 1875,
    y: 545,
    radius: 110,
    color: COLORS.granite,
    imageAsset: "honorsHousing",
    collectible: createCollectible("honors_housing", "Honors Housing"),
    body:
      "This stop extends the housing story toward a more close-knit academic community, where students balance residential life with a stronger sense of intellectual connection.",
    prompt: "What kind of living-learning environment fits you best?",
    options: supportOptions("honors_housing"),
  },
  {
    id: "safety",
    label: "Public Safety Building",
    shortLabel: "Safety",
    x: 1160,
    y: 900,
    radius: 120,
    color: COLORS.ember,
    imageAsset: "safety",
    collectible: createCollectible("safety", "Public Safety"),
    body:
      "The tour's safety script emphasizes 24/7 public safety services and security escorts. The point is simple: students should feel supported here day or night.",
    prompt: "Why does this stop matter to you?",
    options: supportOptions("safety"),
  },
  {
    id: "student_services",
    label: "Student Services",
    shortLabel: "Services",
    x: 1220,
    y: 980,
    radius: 120,
    color: COLORS.sunrise,
    imageAsset: "studentServices",
    collectible: createCollectible("student_services", "Student Services"),
    body:
      "Student Services pulls in the financial-aid tour copy: merit-based and need-based scholarships, plus millions awarded annually, all framed around making higher education more affordable.",
    prompt: "What feels most important here?",
    options: supportOptions("student_services"),
  },
  {
    id: "gardner_commons",
    label: "Gardner Commons",
    shortLabel: "Gardner",
    x: 760,
    y: 1090,
    radius: 120,
    color: COLORS.red,
    imageAsset: "gardnerCommons",
    collectible: createCollectible("gardner_commons", "Gardner Commons"),
    body:
      "The majors tour begins here with a counselor asking what you are interested in. It frames the university as a place with room for science, business, education, engineering, social work, law, honors, and more.",
    prompt: "What kind of direction are you looking for?",
    options: academicOptions("gardner_commons"),
  },
  {
    id: "undergraduate_studies",
    label: "Undergraduate Studies",
    shortLabel: "UG Studies",
    x: 930,
    y: 1185,
    radius: 115,
    color: COLORS.red,
    imageAsset: "undergraduateStudies",
    collectible: createCollectible("undergraduate_studies", "Undergraduate Studies"),
    body:
      "This stop carries the same exploratory spirit as the major-selection sequence: a lot of paths open here, and the real task is figuring out which kind of learning feels most like you.",
    prompt: "What do you want your next step to feel like?",
    options: academicOptions("undergraduate_studies"),
  },
  {
    id: "architecture",
    label: "Architecture Building",
    shortLabel: "Architecture",
    x: 1830,
    y: 975,
    radius: 110,
    color: COLORS.granite,
    imageAsset: "architecture",
    collectible: createCollectible("architecture", "Architecture"),
    body:
      "Architecture appears in the major categories as part of a more design-driven path, where visual thinking, building, and systems all work together.",
    prompt: "Which part of that path sounds most like you?",
    options: academicOptions("architecture"),
  },
  {
    id: "science",
    label: "Science",
    shortLabel: "Science",
    x: 1710,
    y: 1115,
    radius: 110,
    color: COLORS.lake,
    imageAsset: "science",
    collectible: createCollectible("science", "Science"),
    body:
      "Science and research are called out directly in the majors source. This stop represents the part of campus built around discovery, inquiry, and asking better questions.",
    prompt: "What part of science feels most exciting to you?",
    options: academicOptions("science"),
  },
  {
    id: "health",
    label: "Health",
    shortLabel: "Health",
    x: 1525,
    y: 1100,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "health",
    collectible: createCollectible("health", "Health"),
    body:
      "Healthcare is one of the interest tags in the original tour objects, and this stop pushes that people-first direction into a health-focused campus setting.",
    prompt: "What kind of impact do you imagine making?",
    options: supportOptions("health"),
  },
  {
    id: "arts_building",
    label: "Arts Building",
    shortLabel: "Arts",
    x: 1540,
    y: 1265,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "artsBuilding",
    collectible: createCollectible("arts_building", "Arts Building"),
    body:
      "The majors list explicitly includes arts and creativity, and this stop turns that into a real place on the map where making, performing, and producing ideas can take shape.",
    prompt: "What do you want creativity to do for you?",
    options: creativeOptions("arts_building"),
  },
  {
    id: "engineering",
    label: "Engineering",
    shortLabel: "Engineering",
    x: 1780,
    y: 1305,
    radius: 110,
    color: COLORS.granite,
    imageAsset: "engineering",
    collectible: createCollectible("engineering", "Engineering"),
    body:
      "Engineering and technology are core major categories in the tour object, representing the builder side of campus where curiosity turns into tools, prototypes, and systems.",
    prompt: "What part of that builder energy fits you?",
    options: academicOptions("engineering"),
  },
  {
    id: "social_work",
    label: "Social Work",
    shortLabel: "Social Work",
    x: 1360,
    y: 1305,
    radius: 110,
    color: COLORS.red,
    imageAsset: "socialWork",
    collectible: createCollectible("social_work", "Social Work"),
    body:
      "Social Work is named directly in the tour's major categories. It points toward work rooted in support, advocacy, and helping communities move forward.",
    prompt: "What draws you in most?",
    options: supportOptions("social_work"),
  },
  {
    id: "csbs",
    label: "CSBS",
    shortLabel: "CSBS",
    x: 1215,
    y: 1290,
    radius: 110,
    color: COLORS.red,
    imageAsset: "csbs",
    collectible: createCollectible("csbs", "CSBS"),
    body:
      "The College of Social and Behavioral Science sits at the intersection of people, policy, research, and systems. It is a strong match for students interested in how communities actually work.",
    prompt: "What kind of questions do you want to explore?",
    options: academicOptions("csbs"),
  },
  {
    id: "education",
    label: "Education",
    shortLabel: "Education",
    x: 925,
    y: 1365,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "education",
    collectible: createCollectible("education", "Education"),
    body:
      "Education appears in the majors source as part of a social-impact pathway. This stop represents learning that is designed to help other people grow.",
    prompt: "What kind of impact matters most to you?",
    options: supportOptions("education"),
  },
  {
    id: "community_service",
    label: "Community Service",
    shortLabel: "Service",
    x: 820,
    y: 1470,
    radius: 110,
    color: COLORS.red,
    imageAsset: "communityService",
    collectible: createCollectible("community_service", "Community Service"),
    body:
      "Service is one of the original interest tags, and the activities object reinforces the idea that campus life here is about finding your people and making your effort count beyond yourself.",
    prompt: "What feels strongest about that kind of involvement?",
    options: campusLifeOptions("community_service"),
  },
  {
    id: "library",
    label: "Library",
    shortLabel: "Library",
    x: 1070,
    y: 1510,
    radius: 110,
    color: COLORS.lake,
    imageAsset: "library",
    collectible: createCollectible("library", "Library"),
    body:
      "The library stop stands for the quieter side of the same major exploration: research support, study space, and the infrastructure that helps students turn interest into progress.",
    prompt: "How do you want a place like this to support you?",
    options: supportOptions("library"),
  },
  {
    id: "business",
    label: "Eccles Business Building",
    shortLabel: "Business",
    x: 260,
    y: 1420,
    radius: 120,
    color: COLORS.sunrise,
    imageAsset: "business",
    collectible: createCollectible("business", "Business"),
    body:
      "Business and leadership are both central to the source objects, which frame the U as a place to build initiative, entrepreneurship, and momentum that moves people forward.",
    prompt: "Which part of that business path sounds most like you?",
    options: academicOptions("business"),
  },
  {
    id: "food",
    label: "Food",
    shortLabel: "Food",
    x: 430,
    y: 1595,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "food",
    collectible: createCollectible("food", "Food"),
    body:
      "The activities object calls out everything from late-night bites to global cuisine. This stop is about daily campus life feeling varied, social, and easy to enjoy.",
    prompt: "What does that add to the college experience for you?",
    options: campusLifeOptions("food"),
  },
  {
    id: "student_life_center",
    label: "Student Life Center",
    shortLabel: "Life Center",
    x: 690,
    y: 1655,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "studentLifeCenter",
    collectible: createCollectible("student_life_center", "Student Life Center"),
    body:
      "With 600+ clubs and a strong fitness culture in the activities object, this stop captures the side of campus where routines, recreation, and belonging all come together.",
    prompt: "What kind of student life are you looking for?",
    options: campusLifeOptions("student_life_center"),
  },
  {
    id: "jobs",
    label: "Jobs",
    shortLabel: "Jobs",
    x: 980,
    y: 1710,
    radius: 110,
    color: COLORS.granite,
    imageAsset: "jobs",
    collectible: createCollectible("jobs", "Jobs"),
    body:
      "This stop extends the source material's leadership and city-access themes into internships, campus jobs, and the practical opportunities that make college feel connected to life after graduation.",
    prompt: "What sounds most valuable to you?",
    options: academicOptions("jobs"),
  },
  {
    id: "humanities",
    label: "Humanities",
    shortLabel: "Humanities",
    x: 1320,
    y: 1680,
    radius: 110,
    color: COLORS.red,
    imageAsset: "humanities",
    collectible: createCollectible("humanities", "Humanities"),
    body:
      "Humanities is explicitly named in the major categories and points toward language, ideas, culture, ethics, and the kinds of questions that shape how people understand the world.",
    prompt: "What draws you toward humanities?",
    options: creativeOptions("humanities"),
  },
  {
    id: "nursing",
    label: "Nursing",
    shortLabel: "Nursing",
    x: 1505,
    y: 1670,
    radius: 110,
    color: COLORS.sunrise,
    imageAsset: "nursing",
    collectible: createCollectible("nursing", "Nursing"),
    body:
      "Nursing is another direct major callout in the source file. It represents a clear care-centered route where skill, urgency, and human connection meet.",
    prompt: "What part of nursing feels most meaningful?",
    options: supportOptions("nursing"),
  },
  {
    id: "law",
    label: "Law Building",
    shortLabel: "Law",
    x: 1940,
    y: 1780,
    radius: 120,
    color: COLORS.red,
    imageAsset: "law",
    collectible: createCollectible("law", "Law"),
    body:
      "Law appears in the tour's major categories as one of the more direct leadership-oriented routes, where advocacy, systems, and public impact all matter.",
    prompt: "What part of that path stands out to you?",
    options: academicOptions("law"),
  },
  {
    id: "lds_institute",
    label: "LDS Institute",
    shortLabel: "Institute",
    x: 1290,
    y: 1935,
    radius: 110,
    color: COLORS.granite,
    imageAsset: "ldsInstitute",
    collectible: createCollectible("lds_institute", "LDS Institute"),
    body:
      "This stop adds another community-oriented space to the map, reflecting the broader theme that students here build networks and find places that support both identity and belonging.",
    prompt: "What kind of community matters most to you?",
    options: campusLifeOptions("lds_institute"),
  },
  {
    id: "rice_eccles",
    label: "Rice-Eccles Stadium",
    shortLabel: "Stadium",
    x: 2044,
    y: 1695,
    radius: 135,
    color: COLORS.granite,
    imageAsset: "riceEccles",
    collectible: createCollectible("rice_eccles", "Rice-Eccles Stadium"),
    body:
      "The activities source calls out school spirit and sports directly. Rice-Eccles turns that into a stop about tradition, crowd energy, and being part of something bigger.",
    prompt: "What part of that energy feels most like you?",
    options: campusLifeOptions("rice_eccles"),
  },
  {
    id: "transportation",
    label: "UTA TRAX Stop",
    shortLabel: "Transit",
    x: 2607,
    y: 1946,
    radius: 130,
    color: COLORS.lake,
    imageAsset: "transportation",
    collectible: createCollectible("transportation", "Transportation"),
    body:
      "The transportation source is direct: your student ID is your ticket to ride, and buses and TRAX run all day. This stop is about access, independence, and a connected campus.",
    prompt: "What feels most exciting about that access?",
    options: supportOptions("transportation"),
  },
  {
    id: "downtown",
    label: "Downtown Salt Lake City",
    shortLabel: "Downtown",
    x: 2800,
    y: 1320,
    radius: 120,
    color: COLORS.lake,
    imageAsset: "downtown",
    collectible: createCollectible("downtown", "Downtown"),
    body:
      "The activity prompts frame Salt Lake City as part of the experience: city life, food, music venues, and opportunity without losing proximity to the outdoors.",
    prompt: "What does having the city nearby open up for you?",
    options: globalOptions("downtown"),
  },
  {
    id: "red_butte",
    label: "Red Butte Garden",
    shortLabel: "Red Butte",
    x: 2356,
    y: 349,
    radius: 135,
    color: COLORS.ember,
    imageAsset: "redButte",
    collectible: createCollectible("red_butte", "Red Butte Garden"),
    body:
      "Red Butte reflects the tour's outdoors category and the idea that campus life here stays connected to the landscape, trails, and room to reset.",
    prompt: "What does this stop make you want more of?",
    options: outdoorsOptions("red_butte"),
  },
  {
    id: "outdoors",
    label: "Outdoors",
    shortLabel: "Outdoors",
    x: 2620,
    y: 295,
    radius: 120,
    color: COLORS.lake,
    imageAsset: "outdoors",
    collectible: createCollectible("outdoors", "Outdoors"),
    body:
      "The original activities object makes the outdoors one of the defining parts of the U experience, from nearby camping to quick access to mountain space.",
    prompt: "What stands out most about living near all of this?",
    options: outdoorsOptions("outdoors"),
  },
  {
    id: "ski_snowboard",
    label: "Ski and Snowboard",
    shortLabel: "Ski",
    x: 2760,
    y: 520,
    radius: 110,
    color: COLORS.lake,
    imageAsset: "skiSnowboard",
    collectible: createCollectible("ski_snowboard", "Ski and Snowboard"),
    body:
      "One of the clearest facts in the activities file is that there are 11 ski resorts less than an hour away. This stop turns that into a campus-life advantage you can actually feel.",
    prompt: "What does that kind of access mean to you?",
    options: outdoorsOptions("ski_snowboard"),
  },
];

export const tourStopsById = Object.fromEntries(tourStops.map((stop) => [stop.id, stop]));
