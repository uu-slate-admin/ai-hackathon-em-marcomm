import Phaser from "phaser";

import { dialogueEvents } from "../content/dialogueEvents";
import { locationTriggers, locationTriggersById } from "../content/locationTriggers";
import { audioAssets, swoopStageAssets } from "../content/media";
import { campusScene } from "../content/mapScenes";
import { programsByCollegeId, programsById, colleges } from "../content/programCatalog";
import { resolveProgramRoute } from "../content/programRoutes";
import { resultMappings } from "../content/resultMappings";
import { drawCampusMap } from "../game/drawBackdrop";
import { playSoundEffect, startBackgroundMusic } from "../systems/audioState";
import { getInputState, setActionHandler } from "../systems/inputState";
import { buildSlateHref } from "../systems/slatePayload";
import { applyInteraction, getSession, selectProgram } from "../systems/sessionState";
import { resolveSwoopStage } from "../systems/swoopProgression";
import { BRAND_FONT_FAMILY } from "../theme/typography";
import { hideDialogue, showDialogue } from "../ui/dialogueOverlay";
import { updateHud } from "../ui/hud";
import { hideProgramSelector, showProgramSelector } from "../ui/programSelectorOverlay";
import { hideResults, showResults } from "../ui/resultOverlay";

const ROUTE_GREEN = 0x5f8b3d;
const ROUTE_GREEN_DARK = 0x3f6124;
const PLAYER_MOVE_SPEED = 400;

function getLandmarkTextureKeys(isVisited) {
  return {
    pulse: isVisited ? "landmark-node-visited" : "landmark-node-unvisited",
    center: isVisited ? "landmark-core-visited" : "landmark-core-unvisited",
  };
}

export class CampusScene extends Phaser.Scene {
  constructor() {
    super("CampusScene");
    this.activeTrigger = null;
    this.isBusy = false;
    this.markerMap = new Map();
  }

  create() {
    this.isBusy = false;
    this.activeTrigger = null;
    this.markerMap.clear();
    startBackgroundMusic();

    drawCampusMap(this, campusScene, locationTriggers);

    this.physics.world.setBounds(0, 0, campusScene.width, campusScene.height);
    this.cameras.main.setBounds(0, 0, campusScene.width, campusScene.height);
    this.cameras.main.setZoom(1);

    this.createObstacles();
    this.createLandmarks();
    this.createPlayer();

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys("W,A,S,D");
    this.interactKeys = this.input.keyboard.addKeys("SPACE,ENTER,E");
    this.handleEscapeKey = () => this.dismissInteraction();

    this.input.keyboard.on("keydown-SPACE", () => this.tryInteract());
    this.input.keyboard.on("keydown-ENTER", () => this.tryInteract());
    this.input.keyboard.on("keydown-E", () => this.tryInteract());
    this.input.keyboard.on("keydown-ESC", this.handleEscapeKey);
    this.events.once("shutdown", () => {
      this.input.keyboard.off("keydown-ESC", this.handleEscapeKey);
    });

    setActionHandler(() => this.tryInteract());
    hideDialogue();
    hideResults();
    this.refreshMarkers(getSession());
    this.syncHud();

    if (!getSession().selectedProgramId) {
      this.showProgramSelection();
    }
  }

  createObstacles() {
    this.obstacles = this.physics.add.staticGroup();

    campusScene.obstacles.forEach((obstacle) => {
      const block = this.add.rectangle(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
        0x000000,
        0.001,
      );

      this.physics.add.existing(block, true);
      this.obstacles.add(block);
    });
  }

  createLandmarks() {
    const session = getSession();

    locationTriggers.forEach((trigger) => {
      const textureKeys = getLandmarkTextureKeys(session.visitedTriggerIds.includes(trigger.id));
      const pulse = this.add.image(trigger.x, trigger.y, textureKeys.pulse).setDepth(6);
      const center = this.add.image(trigger.x, trigger.y, textureKeys.center).setDepth(7);
      const pinLabel = this.add
        .text(trigger.x + 28, trigger.y - 10, trigger.shortLabel ?? trigger.label, {
          fontFamily: BRAND_FONT_FAMILY.body,
          fontSize: "18px",
          color: "#f5f1e8",
          backgroundColor: "rgba(8, 16, 24, 0.78)",
          padding: { x: 8, y: 5 },
          stroke: "#081018",
          strokeThickness: 3,
        })
        .setOrigin(0, 0.5)
        .setDepth(8);
      const badgeRing = this.add
        .circle(trigger.x + 26, trigger.y - 26, 15, 0xffffff, 0)
        .setStrokeStyle(3, 0xffffff, 0.98)
        .setDepth(8)
        .setVisible(false);
      const badgeFill = this.add.circle(trigger.x + 26, trigger.y - 26, 13, ROUTE_GREEN, 0.98).setDepth(8).setVisible(false);
      const badgeLabel = this.add
        .text(trigger.x + 26, trigger.y - 26, "", {
          fontFamily: BRAND_FONT_FAMILY.display,
          fontSize: "16px",
          color: "#ffffff",
        })
        .setOrigin(0.5)
        .setDepth(9)
        .setVisible(false);

      center.setInteractive({ useHandCursor: true });
      center.on("pointerdown", () => {
        if (
          !this.isBusy &&
          Phaser.Math.Distance.Between(this.player.x, this.player.y, trigger.x, trigger.y) <=
            trigger.radius + 90
        ) {
          this.activeTrigger = trigger;
          this.tryInteract();
        }
      });

      this.markerMap.set(trigger.id, {
        pulse,
        center,
        pinLabel,
        badgeRing,
        badgeFill,
        badgeLabel,
      });
    });
  }

  createPlayer() {
    this.player = this.physics.add
      .image(campusScene.playerStart.x, campusScene.playerStart.y, "player-marker")
      .setDepth(10);

    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(30, 30);
    this.player.body.setOffset(9, 9);
    this.physics.add.collider(this.player, this.obstacles);
    this.player.setVisible(false);

    this.swoopShadow = this.add.ellipse(this.player.x, this.player.y + 44, 54, 18, 0x081018, 0.18).setDepth(8);
    this.swoop = this.add.image(this.player.x, this.player.y, swoopStageAssets.egg.key).setDepth(10);
    this.swoop.setOrigin(0.5, 0.82);
    this.swoopFacingDirection = "left";
    this.syncSwoopSprite("egg");
    this.swoopMotionDirection = new Phaser.Math.Vector2(1, 0);
    this.swoopMotionPhase = Math.random() * Math.PI * 2;
  }

  update() {
    const session = getSession();
    const speed = this.isBusy ? 0 : PLAYER_MOVE_SPEED;
    const inputState = getInputState();
    const movement = new Phaser.Math.Vector2(0, 0);

    if (!this.isBusy) {
      if (this.cursors.left.isDown || this.wasd.A.isDown || inputState.left) movement.x -= 1;
      if (this.cursors.right.isDown || this.wasd.D.isDown || inputState.right) movement.x += 1;
      if (this.cursors.up.isDown || this.wasd.W.isDown || inputState.up) movement.y -= 1;
      if (this.cursors.down.isDown || this.wasd.S.isDown || inputState.down) movement.y += 1;
    }

    movement.normalize().scale(speed);
    this.player.setVelocity(movement.x, movement.y);

    const velocity = this.player.body.velocity;
    const isMoving = velocity.lengthSq() > 1;
    const stageId = session.swoopStage;

    if (isMoving) {
      this.swoopMotionDirection.copy(velocity).normalize();
      this.swoopMotionPhase += 0.22;
    } else {
      this.swoopMotionPhase += 0.045;
    }

    this.updateSwoopFacing(stageId, velocity.x);

    const bobWave = Math.sin(this.swoopMotionPhase);
    const bobAmount = isMoving ? 12 : 5;
    const lift = isMoving ? 10 : 4;
    const bobOffset = bobWave * bobAmount - lift;
    const landingCompression = Phaser.Math.Clamp((bobWave + 1) * 0.5, 0, 1);
    const rotationTarget =
      Phaser.Math.Clamp(this.swoopMotionDirection.x * 0.16, -0.16, 0.16) + bobWave * (isMoving ? 0.03 : 0.012);
    const width = this.swoopBaseDisplaySize.width * (1 + landingCompression * 0.08);
    const height = this.swoopBaseDisplaySize.height * (1 - landingCompression * 0.06);

    this.swoop.x = Phaser.Math.Linear(this.swoop.x, this.player.x, 0.3);
    this.swoop.y = Phaser.Math.Linear(this.swoop.y, this.player.y + bobOffset, 0.24);
    this.swoop.rotation = Phaser.Math.Linear(this.swoop.rotation, rotationTarget, 0.18);
    this.swoop.setDisplaySize(width, height);

    this.swoopShadow.x = Phaser.Math.Linear(this.swoopShadow.x, this.player.x, 0.34);
    this.swoopShadow.y = Phaser.Math.Linear(
      this.swoopShadow.y,
      this.player.y + Math.max(40, this.swoopBaseDisplaySize.height * 0.28),
      0.34,
    );
    this.swoopShadow.setScale(1 - landingCompression * 0.16, 1 - landingCompression * 0.22);
    this.swoopShadow.setAlpha(0.12 + landingCompression * 0.12);

    const nearby = this.findNearbyTrigger();
    this.activeTrigger = nearby;
    updateHud({
      nearbyTrigger: nearby,
      session,
      mode: session.completedAt ? "results" : "play",
    });
  }

  findNearbyTrigger() {
    const session = getSession();
    let closestTrigger = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    if (!session.selectedProgramId) {
      return null;
    }

    locationTriggers.forEach((trigger) => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, trigger.x, trigger.y);

      if (distance < trigger.radius && !session.visitedTriggerIds.includes(trigger.id) && distance < closestDistance) {
        closestTrigger = trigger;
        closestDistance = distance;
      }
    });

    return closestTrigger;
  }

  showProgramSelection() {
    this.isBusy = true;
    this.player.setVelocity(0, 0);

    showProgramSelector({
      colleges,
      programsByCollegeId,
      onConfirm: (program) => {
        const result = selectProgram(program.id, locationTriggersById.gardner_commons);
        hideProgramSelector();
        this.isBusy = false;
        this.refreshMarkers(result.session);
        this.syncHud();
      },
    });
  }

  tryInteract() {
    const session = getSession();

    if (this.isBusy || !this.activeTrigger || !session.selectedProgramId) {
      return;
    }

    const eventData = dialogueEvents[this.activeTrigger.dialogueEventId];

    if (!eventData) {
      return;
    }

    this.isBusy = true;
    this.player.setVelocity(0, 0);
    playSoundEffect(audioAssets.ui.open.key, { volume: 0.32 });

    showDialogue({
      trigger: this.activeTrigger,
      eventData,
      onSelect: () => this.completeInteraction(this.activeTrigger),
    });
  }

  dismissInteraction() {
    if (!this.isBusy) {
      return;
    }

    hideDialogue();
    playSoundEffect(audioAssets.ui.close.key, { volume: 0.26 });
    this.isBusy = false;
    this.activeTrigger = this.findNearbyTrigger();

    updateHud({
      session: getSession(),
      mode: "play",
      nearbyTrigger: this.activeTrigger,
    });
  }

  completeInteraction(trigger) {
    const result = applyInteraction(trigger);
    const stage = resolveSwoopStage(result.session.growthPoints);

    this.refreshMarkers(result.session);
    this.syncSwoopSprite(stage.id);

    hideDialogue();
    playSoundEffect(audioAssets.ui.close.key, { volume: 0.26 });

    if (result.stageChanged) {
      this.playSwoopEvolutionSound(stage.id);
    }

    this.isBusy = false;

    updateHud({
      session: result.session,
      mode: result.completed ? "results" : "play",
      nearbyTrigger: null,
    });

    if (result.newlyCompleted) {
      this.showResultState(result.session);
    }
  }

  showResultState(session) {
    const program = programsById[session.selectedProgramId];
    const routeDefinition = resolveProgramRoute(program);
    const route = {
      ...routeDefinition,
      stops: routeDefinition.stops.map((stop) => ({
        ...stop,
        label: locationTriggersById[stop.triggerId]?.label ?? stop.triggerId,
      })),
    };
    const routeStops = route.stops.map((stop) => ({
      ...stop,
      visited: session.completedRouteTriggerIds.includes(stop.triggerId),
    }));
    const slateHref = buildSlateHref(session);
    const stage = resolveSwoopStage(session.growthPoints);

    this.isBusy = true;
    this.player.setVelocity(0, 0);

    showResults({
      program,
      route,
      routeStops,
      resultMapping: resultMappings[program.programFamilyId] ?? resultMappings.campus_exploration,
      stageLabel: stage.label,
      slateHref,
      routeCompletedCount: session.completedRouteTriggerIds.length,
      onContinue: () => {
        this.isBusy = false;
        updateHud({
          session: getSession(),
          mode: "play",
          nearbyTrigger: this.findNearbyTrigger(),
        });
      },
    });
  }

  refreshMarkers(session) {
    locationTriggers.forEach((trigger) => {
      const marker = this.markerMap.get(trigger.id);

      if (!marker) {
        return;
      }

      const isVisited = session.visitedTriggerIds.includes(trigger.id);
      const isRequired = session.requiredRouteTriggerIds.includes(trigger.id);
      const isRouteComplete = session.completedRouteTriggerIds.includes(trigger.id);
      const routeIndex = session.requiredRouteTriggerIds.indexOf(trigger.id);
      const textureKeys = getLandmarkTextureKeys(isVisited);
      const tint = isRequired ? (isRouteComplete ? ROUTE_GREEN_DARK : ROUTE_GREEN) : trigger.color;

      marker.pulse.setTexture(textureKeys.pulse);
      marker.center.setTexture(textureKeys.center);
      marker.pulse.setTint(tint);
      marker.center.setTint(tint);
      marker.pulse.setAlpha(isRequired ? 0.98 : 0.34);
      marker.center.setAlpha(isRequired ? 1 : 0.56);
      marker.pinLabel.setAlpha(isRequired ? 1 : isVisited ? 0.92 : 0.82);
      marker.pinLabel.setColor(isRequired ? "#ffffff" : isVisited ? "#f5f1e8" : "#d7d3ca");
      marker.pulse.setScale(isRequired && !isRouteComplete ? 1.16 : 1);
      marker.center.setScale(isRequired && !isVisited ? 1.08 : 0.94);
      marker.badgeRing.setVisible(isRequired);
      marker.badgeFill.setVisible(isRequired);
      marker.badgeLabel.setVisible(isRequired);

      if (isRequired) {
        marker.badgeFill.setFillStyle(isRouteComplete ? ROUTE_GREEN_DARK : ROUTE_GREEN, 0.98);
        marker.badgeLabel.setText(String(routeIndex + 1));
      }
    });
  }

  syncHud() {
    updateHud({
      session: getSession(),
      mode: "play",
      nearbyTrigger: null,
    });
  }

  playSwoopEvolutionSound(stageId) {
    const evolutionSound = audioAssets.swoopEvolution[stageId];

    if (!evolutionSound) {
      return;
    }

    playSoundEffect(evolutionSound.key, { volume: 0.72 });
  }

  syncSwoopSprite(stageId) {
    const asset = swoopStageAssets[stageId] ?? swoopStageAssets.egg;
    const directionalAsset = asset.directional?.[this.swoopFacingDirection];
    const textureKey = directionalAsset?.key ?? asset.key;

    this.swoop.setTexture(textureKey);
    this.swoopBaseDisplaySize = { ...asset.displaySize };
    this.swoop.setDisplaySize(asset.displaySize.width, asset.displaySize.height);
    if (this.swoopShadow) {
      this.swoopShadow.setSize(Math.max(44, asset.displaySize.width * 0.52), 18);
    }
  }

  updateSwoopFacing(stageId, velocityX) {
    const asset = swoopStageAssets[stageId] ?? swoopStageAssets.egg;

    if (!asset.directional) {
      return;
    }

    const nextFacingDirection = velocityX > 1 ? "right" : velocityX < -1 ? "left" : this.swoopFacingDirection;

    if (nextFacingDirection === this.swoopFacingDirection) {
      return;
    }

    this.swoopFacingDirection = nextFacingDirection;
    this.syncSwoopSprite(stageId);
  }
}
