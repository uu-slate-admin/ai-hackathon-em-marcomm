import Phaser from "phaser";

import { academicInterestsById } from "../content/academicInterests";
import { collectibleItemsById } from "../content/collectibleItems";
import { dialogueEvents } from "../content/dialogueEvents";
import { locationTriggers } from "../content/locationTriggers";
import { swoopStageAssets } from "../content/media";
import { campusScene } from "../content/mapScenes";
import { resultMappings } from "../content/resultMappings";
import { drawCampusMap } from "../game/drawBackdrop";
import { getInputState, setActionHandler } from "../systems/inputState";
import { buildSlateHref, buildSlatePayload } from "../systems/slatePayload";
import { getSession, applyInteraction, resetSession } from "../systems/sessionState";
import { resolveSwoopStage } from "../systems/swoopProgression";
import { hideDialogue, showDialogue } from "../ui/dialogueOverlay";
import { updateHud } from "../ui/hud";
import { hideResults, showResults } from "../ui/resultOverlay";

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

    this.input.keyboard.on("keydown-SPACE", () => this.tryInteract());
    this.input.keyboard.on("keydown-ENTER", () => this.tryInteract());
    this.input.keyboard.on("keydown-E", () => this.tryInteract());

    setActionHandler(() => this.tryInteract());
    hideDialogue();
    hideResults();
    updateHud({
      session: getSession(),
      mode: "play",
      nearbyTrigger: null,
    });
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
      pulse.setAlpha(0.92);

      const center = this.add.image(trigger.x, trigger.y, textureKeys.center).setDepth(7);

      center.setInteractive({ useHandCursor: true });
      center.on("pointerdown", () => {
        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, trigger.x, trigger.y) <= trigger.radius + 90) {
          this.activeTrigger = trigger;
          this.tryInteract();
        }
      });

      this.markerMap.set(trigger.id, {
        pulse,
        center,
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

    this.swoop = this.add.image(this.player.x - 54, this.player.y + 34, swoopStageAssets.egg.key).setDepth(9);
    this.swoop.setOrigin(0.5, 0.82);
    this.syncSwoopSprite("egg");
    this.swoopFollowDirection = new Phaser.Math.Vector2(0, 1);
    this.swoopFollowPhase = Math.random() * Math.PI * 2;
    this.swoopBob = { offsetY: 0 };
    this.swoopTween = this.tweens.add({
      targets: this.swoopBob,
      offsetY: -10,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  update() {
    const session = getSession();
    const speed = this.isBusy ? 0 : 250;
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
    if (velocity.lengthSq() > 1) {
      this.swoopFollowDirection.copy(velocity).normalize();
      this.swoopFollowPhase += 0.11;
    } else {
      this.swoopFollowPhase += 0.04;
    }

    const followDirection = this.swoopFollowDirection;
    const sideDirection = new Phaser.Math.Vector2(-followDirection.y, followDirection.x);
    const trailingDistance = 48;
    const sideDrift = 10 + Math.sin(this.swoopFollowPhase) * 18;
    const swoopTargetX = this.player.x - (followDirection.x * trailingDistance) + (sideDirection.x * sideDrift);
    const swoopTargetY =
      this.player.y + 26 - (followDirection.y * (trailingDistance * 0.55)) + (sideDirection.y * sideDrift * 0.35);

    this.swoop.x = Phaser.Math.Linear(this.swoop.x, swoopTargetX, 0.08);
    this.swoop.y = Phaser.Math.Linear(this.swoop.y, swoopTargetY + this.swoopBob.offsetY, 0.08);

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

    locationTriggers.forEach((trigger) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        trigger.x,
        trigger.y,
      );

      if (distance < trigger.radius && !session.visitedTriggerIds.includes(trigger.id) && distance < closestDistance) {
        closestTrigger = trigger;
        closestDistance = distance;
      }
    });

    return closestTrigger;
  }

  tryInteract() {
    if (this.isBusy || !this.activeTrigger) {
      return;
    }

    const eventData = dialogueEvents[this.activeTrigger.dialogueEventId];

    if (!eventData) {
      return;
    }

    this.isBusy = true;
    this.player.setVelocity(0, 0);

    showDialogue({
      trigger: this.activeTrigger,
      eventData,
      onSelect: (option) => this.completeInteraction(this.activeTrigger, option),
    });
  }

  completeInteraction(trigger, option) {
    const result = applyInteraction(trigger, option);
    const session = result.session;
    const marker = this.markerMap.get(trigger.id);
    const stage = resolveSwoopStage(session.growthPoints);

    if (marker) {
      const textureKeys = getLandmarkTextureKeys(true);
      marker.pulse.setTexture(textureKeys.pulse);
      marker.center.setTexture(textureKeys.center);
      marker.pulse.setAlpha(0.92);
      marker.center.setAlpha(1);
    }

    this.syncSwoopSprite(stage.id);

    hideDialogue();
    this.isBusy = false;

    updateHud({
      session,
      mode: result.completed ? "results" : "play",
      nearbyTrigger: null,
    });

    if (result.newlyCompleted) {
      this.showResultState(session);
    }
  }

  showResultState(session) {
    this.isBusy = true;
    this.player.setVelocity(0, 0);

    const interest = academicInterestsById[session.academicInterest];
    const resultMapping = resultMappings[session.academicInterest];
    const payload = buildSlatePayload(session);
    const slateHref = buildSlateHref(session);
    const collectedItems = session.collectedItemIds
      .map((itemId) => collectibleItemsById[itemId])
      .filter(Boolean);
    const stage = resolveSwoopStage(session.growthPoints);

    showResults({
      interest,
      resultMapping,
      stageLabel: stage.label,
      collectedItems,
      payload,
      slateHref,
      onContinue: () => {
        this.isBusy = false;
        updateHud({
          session: getSession(),
          mode: "play",
          nearbyTrigger: this.findNearbyTrigger(),
        });
      },
      onRestart: () => {
        resetSession();
        this.scene.restart();
      },
    });
  }

  syncSwoopSprite(stageId) {
    const asset = swoopStageAssets[stageId] ?? swoopStageAssets.egg;

    this.swoop.setTexture(asset.key);
    this.swoop.setDisplaySize(asset.displaySize.width, asset.displaySize.height);
  }
}
