import { academicInterests } from "../content/academicInterests";

export function rankAcademicInterests(scores) {
  return academicInterests
    .map((interest, index) => ({
      interest,
      score: scores[interest.id] ?? 0,
      index,
    }))
    .sort((left, right) => right.score - left.score || left.index - right.index);
}

export function resolveAcademicInterest(scores) {
  return rankAcademicInterests(scores)[0]?.interest.id ?? academicInterests[0].id;
}
