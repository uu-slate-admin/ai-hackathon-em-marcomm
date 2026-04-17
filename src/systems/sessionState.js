import { academicInterests } from "../content/academicInterests";
import { collectibleItemsById } from "../content/collectibleItems";
import { locationTriggers } from "../content/locationTriggers";
import { resolveAcademicInterest } from "./academicInterest";
import { resolveSwoopStage } from "./swoopProgression";

const subscribers = new Set();

function createInterestScores() {
  return Object.fromEntries(academicInterests.map((interest) => [interest.id, 0]));
}

function createSessionState() {
  return {
    gameSessionId: crypto.randomUUID(),
    visitedTriggerIds: [],
    collectedItemIds: [],
    interestScores: createInterestScores(),
    growthPoints: 0,
    swoopStage: "egg",
    academicInterest: null,
    completedAt: null,
  };
}

let state = createSessionState();

function snapshot() {
  return {
    ...state,
    visitedTriggerIds: [...state.visitedTriggerIds],
    collectedItemIds: [...state.collectedItemIds],
    interestScores: { ...state.interestScores },
  };
}

function notify() {
  const current = snapshot();
  subscribers.forEach((subscriber) => subscriber(current));
}

export function subscribeSession(subscriber) {
  subscribers.add(subscriber);
  subscriber(snapshot());

  return () => {
    subscribers.delete(subscriber);
  };
}

export function getSession() {
  return snapshot();
}

export function resetSession() {
  state = createSessionState();
  notify();
  return snapshot();
}

export function applyInteraction(trigger, option) {
  if (state.visitedTriggerIds.includes(trigger.id)) {
    return {
      session: snapshot(),
      stageChanged: false,
      unlockedItem: null,
      completed: Boolean(state.completedAt),
    };
  }

  const previousStage = state.swoopStage;

  state.visitedTriggerIds.push(trigger.id);

  Object.entries(option.interestWeights).forEach(([interestId, weight]) => {
    state.interestScores[interestId] += weight;
  });

  state.growthPoints += option.growthPoints ?? 1;
  state.swoopStage = resolveSwoopStage(state.growthPoints).id;

  let unlockedItem = null;

  if (trigger.collectibleId && !state.collectedItemIds.includes(trigger.collectibleId)) {
    state.collectedItemIds.push(trigger.collectibleId);
    unlockedItem = collectibleItemsById[trigger.collectibleId];
  }

  const completed = state.visitedTriggerIds.length >= locationTriggers.length;

  if (completed) {
    state.academicInterest = resolveAcademicInterest(state.interestScores);
    state.completedAt = new Date().toISOString();
  }

  notify();

  return {
    session: snapshot(),
    stageChanged: previousStage !== state.swoopStage,
    unlockedItem,
    completed,
  };
}
