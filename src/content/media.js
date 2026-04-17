import campusMapUrl from "../../assets/maps/campus-map.png";
import outdoorsPhotoUrl from "../../assets/photos/outdoors.jpg";
import redButtePhotoUrl from "../../assets/photos/red-butte.jpg";
import riceEcclesPhotoUrl from "../../assets/photos/rice-eccles.jpg";
import safetyPhotoUrl from "../../assets/photos/safety.jpg";
import socialWorkPhotoUrl from "../../assets/photos/social-work.jpg";
import studentServicesPhotoUrl from "../../assets/photos/student-services.jpg";
import transportationPhotoUrl from "../../assets/photos/transportation.jpg";
import uacPhotoUrl from "../../assets/photos/uac.jpg";
import umfaPhotoUrl from "../../assets/photos/umfa.jpg";
import undergraduateStudiesPhotoUrl from "../../assets/photos/undergraduate-studies.jpg";
import swoopAdultUrl from "../../assets/sprites/swoop/adult.png";
import swoopEggUrl from "../../assets/sprites/swoop/egg.png";
import swoopGrowingUrl from "../../assets/sprites/swoop/growing.png";
import swoopTeenUrl from "../../assets/sprites/swoop/hatchling.png";
import swoopHatchlingUrl from "../../assets/sprites/swoop/title.png";

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
  hatchling: {
    key: "swoop-hatchling",
    url: swoopHatchlingUrl,
    displaySize: { width: 104, height: 150 },
  },
  growing: {
    key: "swoop-growing",
    url: swoopGrowingUrl,
    displaySize: { width: 114, height: 150 },
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

export const campusPhotoAssets = {
  outdoors: {
    key: "photo-outdoors",
    label: "Outdoors",
    url: outdoorsPhotoUrl,
  },
  redButte: {
    key: "photo-red-butte",
    label: "Red Butte Garden",
    url: redButtePhotoUrl,
  },
  riceEccles: {
    key: "photo-rice-eccles",
    label: "Rice-Eccles Stadium",
    url: riceEcclesPhotoUrl,
  },
  safety: {
    key: "photo-safety",
    label: "Campus Safety",
    url: safetyPhotoUrl,
  },
  socialWork: {
    key: "photo-social-work",
    label: "Social Work",
    url: socialWorkPhotoUrl,
  },
  studentServices: {
    key: "photo-student-services",
    label: "Student Services",
    url: studentServicesPhotoUrl,
  },
  transportation: {
    key: "photo-transportation",
    label: "Transportation",
    url: transportationPhotoUrl,
  },
  uac: {
    key: "photo-uac",
    label: "U Asia Campus",
    url: uacPhotoUrl,
  },
  umfa: {
    key: "photo-umfa",
    label: "UMFA",
    url: umfaPhotoUrl,
  },
  undergraduateStudies: {
    key: "photo-undergraduate-studies",
    label: "Undergraduate Studies",
    url: undergraduateStudiesPhotoUrl,
  },
};

export const titleGalleryPhotos = [
  campusPhotoAssets.uac,
  campusPhotoAssets.umfa,
  campusPhotoAssets.socialWork,
  campusPhotoAssets.safety,
  campusPhotoAssets.outdoors,
];
