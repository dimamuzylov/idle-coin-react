import { Texture, Ticker } from 'pixi.js';
import { Actor, ActorConfig, ActorConfigMetrics, ActorConfigTexture } from './Actor';
import { Projectile, ProjectileConfig } from './Projectile';

export interface CharacterConfigTexture extends ActorConfigTexture {
  actorAttack: Texture[];
  actorHit: Texture[];
  actorMove?: Texture[];
  actorDeath: Texture[];
}

export interface CharacterConfigMetrics extends ActorConfigMetrics {
  power: number;
  attackRange: number;
  /**
   * The attack speed of the character in milliseconds.
   */
  attackSpeed: number;
}

export interface CharacterConfig extends ActorConfig {
  textures: CharacterConfigTexture;
  metrics: CharacterConfigMetrics;
  target: Character | undefined;
}

type CharacterAnimation = 'attack' | 'hit' | 'move' | 'idle' | 'death';

export abstract class Character extends Actor<Character> {
  #health = 100;
  #power = 10;
  #attackRange = 0;
  #attackSpeed = 0;
  #lastAttackTime = 0;

  #animationSheet: Record<CharacterAnimation, Texture[]>;

  constructor(config: CharacterConfig) {
    super(config);

    this.#attackSpeed = config.metrics.attackSpeed;
    this.#power = config.metrics.power;
    this.#animationSheet = {
      idle: config.textures.actor,
      attack: config.textures.actorAttack,
      hit: config.textures.actorHit || [],
      move: config.textures.actorMove || [],
      death: config.textures.actorDeath || [],
    };
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  set attackRange(value: number) {
    this.#attackRange = value;
  }

  get attackRange(): Readonly<number> {
    return this.#attackRange;
  }

  get killed(): boolean {
    return this.#health <= 0;
  }

  get power(): Readonly<number> {
    return this.#power;
  }

  get health(): Readonly<number> {
    return this.#health;
  }

  get isCollided(): boolean {
    return false;
  }

  attack(target: Character): void {
    const projectileConfig = this.createProjectileConfig(target);
    const spot = this.generateProjectile(projectileConfig);
    this.parent.addChild(spot);
    this.playAnimation('attack', this.#attackSpeed / 1000);
  }

  hit(power: number): void {
    if (this.killed) return;
    this.decreaseHealth(power);
    this.updateHealthBar(this.#health);
    this.playAnimation('hit', 1, true);
  }

  /**
   * Update the health bar of the character.
   * @param _ - The value to update the health bar.
   */
  updateHealthBar(_: number): void {}

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */

  protected get canAttack(): boolean {
    return Ticker.shared.lastTime - this.#lastAttackTime >= this.#attackSpeed;
  }

  protected updateLastAttackTime(): void {
    this.#lastAttackTime = Ticker.shared.lastTime;
  }

  /**
   * Generate a projectile.
   * @param config The projectile configuration.
   */
  protected abstract generateProjectile(config: ProjectileConfig): Projectile;

  protected abstract createProjectileConfig(target: Character): ProjectileConfig;

  protected playMove(): void {
    this.playAnimation('move', 0.3);
  }

  protected playDeath(): void {
    this.playAnimation('death', 0.2);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private decreaseHealth(value: number): void {
    this.#health -= value;
  }

  private playAnimation(animation: CharacterAnimation, speed?: number, force?: boolean): void {
    if (this.playing && !force) return;

    this.textures = this.#animationSheet[animation];
    this.animationSpeed = speed || 1;
    this.play();
    this.onComplete = () => {
      this.textures = this.#animationSheet.idle;
    };
  }
}
