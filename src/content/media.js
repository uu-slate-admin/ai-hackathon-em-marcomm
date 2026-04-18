import campusMapUrl from "../../assets/maps/campus-map.png";
import swoopAdultUrl from "../../assets/sprites/swoop/adult.png";
import swoopAdolescentUrl from "../../assets/sprites/swoop/adolescent.png";
import swoopAdolescentLeftUrl from "../../assets/sprites/swoop/directional/Early Adolescence_Swoop left.png";
import swoopAdolescentRightUrl from "../../assets/sprites/swoop/directional/Early Adolescence_Swoop right.png";
import swoopBabyUrl from "../../assets/sprites/swoop/baby.png";
import swoopBabyLeftUrl from "../../assets/sprites/swoop/directional/Baby Swoop left.png";
import swoopBabyRightUrl from "../../assets/sprites/swoop/directional/Baby Swoop right.png";
import swoopEggUrl from "../../assets/sprites/swoop/egg.png";
import swoopTeenUrl from "../../assets/sprites/swoop/teen.png";
import swoopTeenLeftUrl from "../../assets/sprites/swoop/directional/Teenage_Swoop left.png";
import swoopTeenRightUrl from "../../assets/sprites/swoop/directional/Teenage_Swoop right.png";
import backgroundMusicUrl from "../../assets/audio/music/Chiptune Wonderland Loop.wav";
import uiCloseSoundUrl from "../../assets/audio/ui/Close.mp3";
import uiOpenSoundUrl from "../../assets/audio/ui/Open.mp3";
import swoopAdultSoundUrl from "../../assets/audio/swoop_evolution/Adult.mp3";
import swoopAdolescentSoundUrl from "../../assets/audio/swoop_evolution/adolecent-chirp.mp3";
import swoopEggHatchSoundUrl from "../../assets/audio/swoop_evolution/egg-hatch.wav";
import swoopTeenSoundUrl from "../../assets/audio/swoop_evolution/Teen Swoop.mp3";

function resolveTempPhoto(path) {
  return new URL(`../../assets/photos/${path}`, import.meta.url).href;
}

export const mapAsset = {
  key: "campus-map",
  url: campusMapUrl,
};

export const swoopStageAssets = {
  egg: {
    key: "swoop-egg",
    url: swoopEggUrl,
    displaySize: { width: 92, height: 130 },
  },
  baby: {
    key: "swoop-baby",
    url: swoopBabyUrl,
    displaySize: { width: 104, height: 150 },
    directional: {
      left: {
        key: "swoop-baby-left",
        url: swoopBabyLeftUrl,
      },
      right: {
        key: "swoop-baby-right",
        url: swoopBabyRightUrl,
      },
    },
  },
  adolescent: {
    key: "swoop-adolescent",
    url: swoopAdolescentUrl,
    displaySize: { width: 114, height: 150 },
    directional: {
      left: {
        key: "swoop-adolescent-left",
        url: swoopAdolescentLeftUrl,
      },
      right: {
        key: "swoop-adolescent-right",
        url: swoopAdolescentRightUrl,
      },
    },
  },
  teen: {
    key: "swoop-teen",
    url: swoopTeenUrl,
    displaySize: { width: 124, height: 164 },
    directional: {
      left: {
        key: "swoop-teen-left",
        url: swoopTeenLeftUrl,
      },
      right: {
        key: "swoop-teen-right",
        url: swoopTeenRightUrl,
      },
    },
  },
  adult: {
    key: "swoop-adult",
    url: swoopAdultUrl,
    displaySize: { width: 110, height: 170 },
  },
};

export const titleHeroAsset = {
  key: "swoop-title-hero",
  url: swoopTeenUrl,
};

export const audioAssets = {
  music: {
    background: {
      key: "bgm-campus-loop",
      url: backgroundMusicUrl,
    },
  },
  ui: {
    open: {
      key: "ui-open",
      url: uiOpenSoundUrl,
    },
    close: {
      key: "ui-close",
      url: uiCloseSoundUrl,
    },
  },
  swoopEvolution: {
    baby: {
      key: "swoop-evolution-baby",
      url: swoopEggHatchSoundUrl,
    },
    adolescent: {
      key: "swoop-evolution-adolescent",
      url: swoopAdolescentSoundUrl,
    },
    teen: {
      key: "swoop-evolution-teen",
      url: swoopTeenSoundUrl,
    },
    adult: {
      key: "swoop-evolution-adult",
      url: swoopAdultSoundUrl,
    },
  },
};

export const campusPhotoAssets = {
  architecture: {
    key: "photo-architecture",
    label: "Architecture",
    url: resolveTempPhoto("AI Hackathon Architecture 007.jpg"),
  },
  artsBuilding: {
    key: "photo-arts-building",
    label: "Arts Building",
    url: resolveTempPhoto("AI Hackathon Arts Building 035.jpg"),
  },
  blockU: {
    key: "photo-block-u",
    label: "Block U",
    url: resolveTempPhoto("AI Hackathon Block U Option 1 006.jpg"),
  },
  business: {
    key: "photo-business",
    label: "Eccles Business Building",
    url: resolveTempPhoto("AI Hackathon Business 2 004.jpg"),
  },
  csbs: {
    key: "photo-csbs",
    label: "College of Social and Behavioral Science",
    url: resolveTempPhoto("AI Hackathon CSBS 005.jpg"),
  },
  communityService: {
    key: "photo-community-service",
    label: "Community Service",
    url: resolveTempPhoto("AI Hackathon Community Service 025.jpg"),
  },
  downtown: {
    key: "photo-downtown",
    label: "Downtown Salt Lake City",
    url: resolveTempPhoto("AI Hackathon Downtown 026.jpg"),
  },
  education: {
    key: "photo-education",
    label: "Education",
    url: resolveTempPhoto("AI Hackathon Education 012.jpg"),
  },
  engineering: {
    key: "photo-engineering",
    label: "Engineering",
    url: resolveTempPhoto("AI Hackathon Engineering Option 1 003.jpg"),
  },
  food: {
    key: "photo-food",
    label: "Food",
    url: resolveTempPhoto("AI Hackathon Food 029.jpg"),
  },
  gardnerCommons: {
    key: "photo-gardner-commons",
    label: "Gardner Commons",
    url: resolveTempPhoto("AI Hackathon Gardner Commons 011.jpg"),
  },
  health: {
    key: "photo-health",
    label: "Health",
    url: resolveTempPhoto("AI Hackathon Health 014.jpg"),
  },
  honorsHousing: {
    key: "photo-honors-housing",
    label: "Honors Housing",
    url: resolveTempPhoto("AI Hackathon Honors Housing 038.jpg"),
  },
  humanities: {
    key: "photo-humanities",
    label: "Humanities",
    url: resolveTempPhoto("AI Hackathon Humanities 040.jpg"),
  },
  jobs: {
    key: "photo-jobs",
    label: "Jobs",
    url: resolveTempPhoto("AI Hackathon Jobs 030.jpg"),
  },
  kahlertVillage: {
    key: "photo-kahlert-village",
    label: "Kahlert Village",
    url: resolveTempPhoto("AI Hackathon Kalhert Village 016.jpg"),
  },
  ldsInstitute: {
    key: "photo-lds-institute",
    label: "LDS Institute",
    url: resolveTempPhoto("AI Hackathon LDS Institute 017.jpg"),
  },
  law: {
    key: "photo-law",
    label: "Law",
    url: resolveTempPhoto("AI Hackathon Law 020.jpg"),
  },
  library: {
    key: "photo-library",
    label: "Library",
    url: resolveTempPhoto("AI Hackathon Library 031.jpg"),
  },
  nursing: {
    key: "photo-nursing",
    label: "Nursing",
    url: resolveTempPhoto("AI Hackathon Nursing 009.jpg"),
  },
  outdoors: {
    key: "photo-outdoors",
    label: "Outdoors",
    url: resolveTempPhoto("AI Hackathon Outdoors 036.jpg"),
  },
  redButte: {
    key: "photo-red-butte",
    label: "Red Butte Garden",
    url: resolveTempPhoto("AI Hackathon Redbutte 018.jpg"),
  },
  riceEccles: {
    key: "photo-rice-eccles",
    label: "Rice-Eccles Stadium",
    url: resolveTempPhoto("AI Hackathon Rice Eccles 022.jpg"),
  },
  safety: {
    key: "photo-safety",
    label: "Campus Safety",
    url: resolveTempPhoto("AI Hackathon Safety 033.jpg"),
  },
  science: {
    key: "photo-science",
    label: "Science",
    url: resolveTempPhoto("AI Hackathon Science 010.jpg"),
  },
  skiSnowboard: {
    key: "photo-ski-snowboard",
    label: "Ski and Snowboard",
    url: resolveTempPhoto("AI Hackathon Ski Snowboard 032.jpg"),
  },
  socialWork: {
    key: "photo-social-work",
    label: "Social Work",
    url: resolveTempPhoto("AI Hackathon Social Work 039.jpg"),
  },
  studentLifeCenter: {
    key: "photo-student-life-center",
    label: "Student Life Center",
    url: resolveTempPhoto("AI Hackathon Student Life Center 021.jpg"),
  },
  studentServices: {
    key: "photo-student-services",
    label: "Student Services",
    url: resolveTempPhoto("AI Hackathon Student Services 027.jpg"),
  },
  transportation: {
    key: "photo-transportation",
    label: "Transportation",
    url: resolveTempPhoto("AI Hackathon Transportation 034.jpg"),
  },
  uac: {
    key: "photo-uac",
    label: "U Asia Campus",
    url: resolveTempPhoto("AI Hackathon UAC 023.jpg"),
  },
  umfa: {
    key: "photo-umfa",
    label: "UMFA",
    url: resolveTempPhoto("AI Hackathon UMFA 024.jpg"),
  },
  undergraduateStudies: {
    key: "photo-undergraduate-studies",
    label: "Undergraduate Studies",
    url: resolveTempPhoto("AI Hackathon Undergraduate Studies 037.jpg"),
  },
};

export const titleGalleryPhotos = [
  campusPhotoAssets.blockU,
  campusPhotoAssets.kahlertVillage,
  campusPhotoAssets.studentServices,
  campusPhotoAssets.transportation,
  campusPhotoAssets.redButte,
];
