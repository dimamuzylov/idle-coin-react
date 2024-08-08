import { IPointData, Texture } from 'pixi.js';
import { Character } from './Character';
import { Health } from './Health';

export class Enemy extends Character {
  id = Math.random().toString(36).substr(2, 9);
  #healthBar: Health;

  constructor(
    position: IPointData,
    width: number,
    height: number,
    target: Character,
    texture: Texture,
    projectileTexture: Texture
  ) {
    super(
      position,
      width,
      height,
      texture,
      projectileTexture,
      target,
      Math.random() * (1 - 0.5) + 0.5
    );

    this.#healthBar = new Health({
      x: this.width * 2,
      y: 0,
    });
    this.addChild(this.#healthBar);
  }

  moveForward(delta: number): void {
    if (!this.target) return;
    const stopPosition = this.target.position.x + this.target.width;
    const x = this.position.x - delta * this.speed;
    this.position.x = stopPosition ? (x > stopPosition ? x : stopPosition) : x;
  }

  override updateHealthBar(): void {
    this.#healthBar.updateHealth(this.health);
  }
}
