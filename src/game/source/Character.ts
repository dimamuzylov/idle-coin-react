import { Container, Texture } from 'pixi.js';
import { Actor, ActorConfigMetrics, ActorConfigTexture } from './Actor';
import { Projectile, ProjectileConfig } from './Projectile';

export interface CharacterConfigMetrics extends ActorConfigMetrics {
  power: number;
  attackRange: number;
}
export interface CharacterConfigTexture extends ActorConfigTexture {
  projectile: Texture;
}
export type CharacterConfig = {
  metrics: CharacterConfigMetrics;
  textures: CharacterConfigTexture;
  target: Character | undefined;
};

export abstract class Character extends Actor<Character> {
  #projectileTexture: Texture;
  #health = 100;
  #power = 10;
  #attackRange = 0;

  constructor(config: CharacterConfig) {
    super(config);

    this.#power = config.metrics.power;
    this.#attackRange = config.metrics.attackRange;
    this.#projectileTexture = config.textures.projectile;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC GETTERS                       *
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

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  attack(target: Character): void {
    const projectileConfig = this.createProjectileConfig(
      target,
      this.#projectileTexture
    );
    const spot = this.generateProjectile(projectileConfig);
    const root = this.getRoot(this);
    root.addChild(spot);
  }

  hit(power: number): void {
    if (this.killed) return;
    this.decreaseHealth(power);
    this.updateHealthBar(this.#health);
  }

  /**
   * Update the health bar of the character.
   * @param value The value to update the health bar.
   */
  updateHealthBar(_: number): void {}
  /**
   * Move the character.
   * @param delta The time delta.
   */
  move(_: number): void {}

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */

  /**
   * Generate a projectile.
   * @param config The projectile configuration.
   */
  protected abstract generateProjectile(_: ProjectileConfig): Projectile;
  protected abstract createProjectileConfig(
    target: Character,
    texture: Texture
  ): ProjectileConfig;

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

  private getRoot(container: Container): Container {
    return container.parent ? this.getRoot(container.parent) : container;
  }
}
