import { Actor, ActorConfig, ActorConfigMetrics } from './Actor';
import { Character } from './Character';

interface ProjectileConfigMetrics extends ActorConfigMetrics {
  speed: number;
  power: number;
}
export interface ProjectileConfig extends ActorConfig {
  metrics: ProjectileConfigMetrics;
  target: Character;
}

export abstract class Projectile extends Actor<Character> {
  id = Math.random().toString(36).substr(2, 9);
  #power: number;

  constructor(config: ProjectileConfig) {
    super(config);

    this.#power = config.metrics.power;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC GETTERS                       *
   *                                                            *
   * ************************************************************
   */
  abstract get isCollided(): boolean;
  get power(): Readonly<number> {
    return this.#power;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */

  /**
   * Move the projectile to the target
   * @param delta - The time delta
   */
  abstract move(_: number): void;
}
