import { Texture, Ticker } from 'pixi.js';
import { Actor, ActorConfig, ActorConfigMetrics, ActorConfigTexture } from './Actor';
import { Projectile } from './Projectile';

export interface CharacterConfigTexture extends ActorConfigTexture {
  actorAttack: Texture[];
  actorHit: Texture[];
  actorMove?: Texture[];
  actorDeath: Texture[];
}

export interface CharacterConfigMetrics extends ActorConfigMetrics {
  power: number;
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
  #attackSpeed = 0;
  #lastAttackTime = 0;

  #animationSheet: Record<CharacterAnimation, Texture[]>;

  protected constructor(config: CharacterConfig) {
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
  get killed(): boolean {
    return this.#health <= 0;
  }

  get health(): Readonly<number> {
    return this.#health;
  }

  hit(power: number): void {
    if (this.killed) return;
    this.decreaseHealth(power);
    this.playAnimation('hit', 1, true);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected get power(): Readonly<number> {
    return this.#power;
  }

  protected get isLastAttackTimeValid(): boolean {
    return Ticker.shared.lastTime - this.#lastAttackTime >= this.#attackSpeed;
  }

  protected updateLastAttackTime(): void {
    this.#lastAttackTime = Ticker.shared.lastTime;
  }

  protected attack(target: Character): void {
    const spot = this.generateProjectile(target);
    this.parent.addChild(spot);
    this.playAnimation('attack', 3);
  }

  /**
   * Generate a projectile.
   * @param target - The target to attack.
   */
  protected abstract generateProjectile(target: Character): Projectile;

  protected playAnimation(animation: CharacterAnimation, speed?: number, force?: boolean): void {
    if (this.playing && !force) return;

    this.textures = this.#animationSheet[animation];
    this.animationSpeed = speed || 1;
    this.play();
    this.onComplete = () => {
      this.textures = this.#animationSheet.idle;
    };
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
}
