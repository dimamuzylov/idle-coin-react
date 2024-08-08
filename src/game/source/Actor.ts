import { IPointData, Sprite, Texture } from 'pixi.js';

export class Actor extends Sprite {
  protected target?: Actor;
  protected speed: number;

  constructor(
    position: IPointData,
    width: number,
    height: number,
    target?: Actor,
    speed?: number,
    texture?: Texture
  ) {
    super(texture);

    this.target = target;
    this.position = position;
    this.width = width;
    this.height = height;
    this.speed = speed || 0;
  }
}
