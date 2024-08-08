import { IPointData, Texture } from 'pixi.js';
import { Actor } from './Actor';
import { Character } from './Character';

export class Enemy extends Character {
  constructor(
    position: IPointData,
    width: number,
    height: number,
    target: Actor,
    texture?: Texture
  ) {
    super(
      position,
      width,
      height,
      target,
      Math.random() * (1 - 0.5) + 0.5,
      texture
    );
  }

  moveForward(delta: number): void {
    const stopPosition = this.target!.position.x;
    const x = this.position.x - delta * this.speed;
    this.position.x = stopPosition ? (x > stopPosition ? x : stopPosition) : x;
  }
}
