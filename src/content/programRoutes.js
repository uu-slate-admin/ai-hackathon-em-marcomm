const ROUTE_FAMILIES = {
  engineering_innovation: {
    id: "engineering_innovation",
    label: "Engineering + Innovation",
    stops: [
      {
        triggerId: "engineering",
        reason: "Start with the builder core of campus where design, systems, and applied problem-solving come together.",
      },
      {
        triggerId: "science",
        reason: "Back up that hands-on mindset with research space, experimentation, and discovery-driven learning.",
      },
      {
        triggerId: "library",
        reason: "See where project work, technical study, and cross-disciplinary collaboration get practical support.",
      },
      {
        triggerId: "jobs",
        reason: "Connect classroom work to internships, campus roles, and the kind of experience employers look for.",
      },
      {
        triggerId: "transportation",
        reason: "Round out the route with access to internships, industry touchpoints, and movement across the city.",
      },
    ],
  },
  business_leadership: {
    id: "business_leadership",
    label: "Business + Leadership",
    stops: [
      {
        triggerId: "business",
        reason: "Anchor the route in the Eccles Business Building and its entrepreneurship-first energy.",
      },
      {
        triggerId: "jobs",
        reason: "Explore the internships, campus work, and early-career momentum tied to business pathways.",
      },
      {
        triggerId: "downtown",
        reason: "See how the university’s city access supports networking, industry exposure, and opportunity.",
      },
      {
        triggerId: "community_service",
        reason: "Leadership here is also about impact, initiative, and showing up for real communities.",
      },
      {
        triggerId: "transportation",
        reason: "Easy movement across campus and the city makes networking and applied learning more reachable.",
      },
    ],
  },
  design_making: {
    id: "design_making",
    label: "Design + Creative Production",
    stops: [
      {
        triggerId: "architecture",
        reason: "Begin with a place where visual thinking, systems, and building culture all meet.",
      },
      {
        triggerId: "arts_building",
        reason: "See where making, performing, and creative production show up as daily practice.",
      },
      {
        triggerId: "umfa",
        reason: "Connect your path to public-facing art, culture, and storytelling across campus.",
      },
      {
        triggerId: "library",
        reason: "Creative work still needs research, archive access, and space to refine ideas.",
      },
      {
        triggerId: "downtown",
        reason: "The nearby city opens up venues, audiences, and cultural energy beyond the classroom.",
      },
    ],
  },
  health_care: {
    id: "health_care",
    label: "Health + Care",
    stops: [
      {
        triggerId: "health",
        reason: "Start with a people-centered stop that frames impact, wellness, and care-driven work.",
      },
      {
        triggerId: "nursing",
        reason: "See a direct care pathway where urgency, skill, and human connection all matter.",
      },
      {
        triggerId: "student_services",
        reason: "Health-minded students often rely on advising, aid, and support systems that keep them moving.",
      },
      {
        triggerId: "library",
        reason: "Research, study, and evidence-based learning are part of every strong health pathway.",
      },
      {
        triggerId: "student_life_center",
        reason: "Campus wellbeing also includes movement, routine, and personal sustainability.",
      },
    ],
  },
  human_support: {
    id: "human_support",
    label: "Support + Advocacy",
    stops: [
      {
        triggerId: "social_work",
        reason: "Begin with the clearest advocacy-centered space on the map.",
      },
      {
        triggerId: "community_service",
        reason: "Support work is strongest when it stays connected to real communities and lived needs.",
      },
      {
        triggerId: "student_services",
        reason: "This stop shows how guidance and institutional support systems shape student success.",
      },
      {
        triggerId: "health",
        reason: "Human-centered pathways often intersect with wellbeing, care, and public health contexts.",
      },
      {
        triggerId: "library",
        reason: "Wrap the route in the research and reflection space that supports thoughtful advocacy work.",
      },
    ],
  },
  education_impact: {
    id: "education_impact",
    label: "Education + Social Impact",
    stops: [
      {
        triggerId: "education",
        reason: "Start where teaching, growth, and student development are foregrounded.",
      },
      {
        triggerId: "community_service",
        reason: "Education is closely tied to outreach, service, and work that matters beyond the classroom.",
      },
      {
        triggerId: "library",
        reason: "Preparation, literacy, research, and curriculum thinking all connect back here.",
      },
      {
        triggerId: "student_services",
        reason: "Support systems are part of learning design, advising, and student success work too.",
      },
      {
        triggerId: "student_life_center",
        reason: "A strong education path should also help you think about whole-student wellbeing and belonging.",
      },
    ],
  },
  humanities_culture: {
    id: "humanities_culture",
    label: "Humanities + Culture",
    stops: [
      {
        triggerId: "humanities",
        reason: "Start with the disciplines centered on culture, language, ethics, and meaning-making.",
      },
      {
        triggerId: "library",
        reason: "Archives, reading, research support, and deep study are part of the daily rhythm here.",
      },
      {
        triggerId: "umfa",
        reason: "Humanities work gains power when it stays in conversation with art and public culture.",
      },
      {
        triggerId: "uac",
        reason: "Global perspective and cross-cultural fluency matter across many humanities pathways.",
      },
      {
        triggerId: "downtown",
        reason: "The city adds public life, institutions, and real cultural context to what you study.",
      },
    ],
  },
  science_research: {
    id: "science_research",
    label: "Science + Research",
    stops: [
      {
        triggerId: "science",
        reason: "Begin with the core research-facing stop built around curiosity and discovery.",
      },
      {
        triggerId: "engineering",
        reason: "Many science paths intersect with technical tools, instrumentation, and applied systems.",
      },
      {
        triggerId: "health",
        reason: "Research here often connects to health, human outcomes, and real-world problem solving.",
      },
      {
        triggerId: "library",
        reason: "Strong science work depends on study support, literature review, and disciplined inquiry.",
      },
      {
        triggerId: "undergraduate_studies",
        reason: "End with a place that reinforces how many research paths and interdisciplinary options stay open.",
      },
    ],
  },
  society_policy: {
    id: "society_policy",
    label: "Society + Policy",
    stops: [
      {
        triggerId: "csbs",
        reason: "Start where people, systems, policy, and behavioral questions come together most directly.",
      },
      {
        triggerId: "law",
        reason: "This stop adds governance, advocacy, systems, and public-impact thinking to the route.",
      },
      {
        triggerId: "community_service",
        reason: "Policy and social systems matter most when they connect to real communities.",
      },
      {
        triggerId: "humanities",
        reason: "Context, ethics, communication, and interpretation strengthen society-facing work.",
      },
      {
        triggerId: "downtown",
        reason: "The city adds a practical lens on government, institutions, nonprofit work, and civic life.",
      },
    ],
  },
  campus_exploration: {
    id: "campus_exploration",
    label: "Campus Exploration",
    stops: [
      {
        triggerId: "undergraduate_studies",
        reason: "Start with the broadest exploratory stop on the map.",
      },
      {
        triggerId: "library",
        reason: "The library is a useful anchor no matter which direction the student ultimately chooses.",
      },
      {
        triggerId: "student_services",
        reason: "Advising, aid, and logistics help keep options open while the student narrows focus.",
      },
      {
        triggerId: "community_service",
        reason: "Shared campus life can help clarify what kind of work and impact feels meaningful.",
      },
      {
        triggerId: "jobs",
        reason: "Career exploration often becomes clearer once students see how majors connect to real work.",
      },
    ],
  },
};

export const programRoutesByFamilyId = ROUTE_FAMILIES;

export function resolveProgramRoute(program) {
  return ROUTE_FAMILIES[program.programFamilyId] ?? ROUTE_FAMILIES.campus_exploration;
}
