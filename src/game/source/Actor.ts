import { AnimatedSprite, IPointData, Texture } from 'pixi.js';

export type ActorConfigTexture = {
  actor: Texture[];
};
export type ActorConfigMetrics = {
  position: IPointData;
  width: number;
  height: number;
  speed?: number;
};
export type ActorConfig = {
  metrics: ActorConfigMetrics;
  textures: ActorConfigTexture;
  target: Actor | undefined;
};

export abstract class Actor<T = unknown> extends AnimatedSprite {
  target: T;
  protected speed: number;

  protected constructor(config: ActorConfig) {
    super(config.textures.actor);

    this.target = config.target as T;
    this.position = config.metrics.position;
    this.width = config.metrics.width;
    this.height = config.metrics.height;
    this.speed = config.metrics.speed || 0;

    this.loop = false;
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
   * @param _ - The time delta
   */
  move(_: number): void {}
}
