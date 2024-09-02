import { Ticker } from 'pixi.js';
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
  #power: number;

  constructor(config: ProjectileConfig) {
    super(config);

    this.#power = config.metrics.power;

    Ticker.shared.add(this.tickerUpdate, this);
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
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private tickerUpdate(delta: number) {
    if (this.isCollided) {
      this.target?.hit(this.power);
      this.destroy();
      Ticker.shared.remove(this.tickerUpdate, this);
    } else {
      this.move(delta);
    }
  }
}
