import { collectibleItemsById } from "../content/collectibleItems";
import { programsById } from "../content/programCatalog";
import { REQUIRED_STOPS } from "../content/tourStops";
import { resolveProgramRoute } from "../content/programRoutes";
import { resolveSwoopStage } from "./swoopProgression";

const subscribers = new Set();

function createSessionState() {
  return {
    gameSessionId: crypto.randomUUID(),
    visitedTriggerIds: [],
    collectedItemIds: [],
    growthPoints: 0,
    swoopStage: "egg",
    selectedProgramId: null,
    selectedProgramFamilyId: null,
    selectedCollegeId: null,
    requiredRouteTriggerIds: [],
    completedRouteTriggerIds: [],
    completedAt: null,
  };
}

let state = createSessionState();

function snapshot() {
  return {
    ...state,
    visitedTriggerIds: [...state.visitedTriggerIds],
    collectedItemIds: [...state.collectedItemIds],
    requiredRouteTriggerIds: [...state.requiredRouteTriggerIds],
    completedRouteTriggerIds: [...state.completedRouteTriggerIds],
  };
}

function notify() {
  const current = snapshot();
  subscribers.forEach((subscriber) => subscriber(current));
}

function unlockCollectible(trigger) {
  if (!trigger.collectibleId || state.collectedItemIds.includes(trigger.collectibleId)) {
    return null;
  }

  state.collectedItemIds.push(trigger.collectibleId);
  return collectibleItemsById[trigger.collectibleId] ?? null;
}

function visitTrigger(trigger) {
  if (!state.visitedTriggerIds.includes(trigger.id)) {
    state.visitedTriggerIds.push(trigger.id);
  }
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

export function selectProgram(programId, trigger) {
  const program = programsById[programId];

  if (!program) {
    throw new Error(`Unknown program: ${programId}`);
  }

  const route = resolveProgramRoute(program);

  state.selectedProgramId = program.id;
  state.selectedProgramFamilyId = program.programFamilyId;
  state.selectedCollegeId = program.collegeId;
  state.requiredRouteTriggerIds = route.stops.map((stop) => stop.triggerId);
  state.completedRouteTriggerIds = [];
  state.completedAt = null;
  visitTrigger(trigger);
  const unlockedItem = unlockCollectible(trigger);

  notify();

  return {
    session: snapshot(),
    unlockedItem,
    route,
    program,
  };
}

export function applyInteraction(trigger) {
  if (state.visitedTriggerIds.includes(trigger.id)) {
    return {
      session: snapshot(),
      stageChanged: false,
      unlockedItem: null,
      completed: Boolean(state.completedAt),
      newlyCompleted: false,
      countedTowardRoute: state.completedRouteTriggerIds.includes(trigger.id),
    };
  }

  const previousStage = state.swoopStage;

  visitTrigger(trigger);
  const unlockedItem = unlockCollectible(trigger);

  const countedTowardRoute = state.requiredRouteTriggerIds.includes(trigger.id);

  if (countedTowardRoute && !state.completedRouteTriggerIds.includes(trigger.id)) {
    state.completedRouteTriggerIds.push(trigger.id);
    state.growthPoints += 1;
    state.swoopStage = resolveSwoopStage(state.growthPoints).id;
  }

  const completed = state.completedRouteTriggerIds.length >= REQUIRED_STOPS;
  const newlyCompleted = completed && !state.completedAt;

  if (newlyCompleted) {
    state.completedAt = new Date().toISOString();
  }

  notify();

  return {
    session: snapshot(),
    stageChanged: previousStage !== state.swoopStage,
    unlockedItem,
    completed,
    newlyCompleted,
    countedTowardRoute,
  };
}
