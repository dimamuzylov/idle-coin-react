import { IPointData, Sprite, Texture } from 'pixi.js';

export type ActorConfigTexture = {
  actor: Texture;
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
  target?: Actor;
};

export class Actor extends Sprite {
  target?: Actor;
  protected speed: number;

  constructor(config: ActorConfig) {
    super(config.textures.actor);

    this.target = config.target;
    this.position = config.metrics.position;
    this.width = config.metrics.width;
    this.height = config.metrics.height;
    this.speed = config.metrics.speed || 0;
  }
}
