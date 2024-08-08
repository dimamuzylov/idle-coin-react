import { IPointData, Sprite, Texture } from 'pixi.js';

export class Actor extends Sprite {
  target?: Actor;
  #killed = false;
  protected speed: number;

  constructor(
    position: IPointData,
    width: number,
    height: number,
    texture: Texture,
    target?: Actor,
    speed?: number
  ) {
    super(texture);

    this.target = target;
    this.position = position;
    this.width = width;
    this.height = height;
    this.speed = speed || 0;
  }

  get killed(): boolean {
    return this.#killed;
  }

  kill(): void {
    this.#killed = true;
  }
}
