import { IPointData, Texture } from 'pixi.js';
import { Actor } from './Actor';
import { Projectile } from './Projectile';

export class Character extends Actor {
  readonly #spots: Projectile[] = [];
  readonly #hits = new Set<string>(); // Set of projectile ids
  #projectileTexture: Texture;
  #health = 100;

  constructor(
    position: IPointData,
    width: number,
    height: number,
    texture: Texture,
    projectileTexture: Texture,
    target?: Character,
    speed?: number
  ) {
    super(position, width, height, texture, target, speed);

    this.#projectileTexture = projectileTexture;
  }

  get spots(): Projectile[] {
    return this.#spots;
  }

  get hits(): Set<string> {
    return this.#hits;
  }

  get health(): Readonly<number> {
    return this.#health;
  }

  attack(target: Character): void {
    const spot = new Projectile(
      {
        x: this.worldTransform.tx + this.width / 2,
        y: this.worldTransform.ty + this.height / 2,
      },
      20,
      20,
      this.#projectileTexture,
      target,
      4
    );
    target.hit(spot);
    this.#spots.push(spot);
  }

  hit(spot: Projectile): void {
    this.#hits.add(spot.id);
  }

  /**
   * Update the position of the projectiles.
   * Destroy the projectile if it collides with the target.
   * Decrease health and destroy the target if health is less than or equal to 0 and hits are empty.
   * @param delta
   */
  realign(delta: number): void {
    for (let i = 0; i < this.#spots.length; i++) {
      const spot = this.#spots[i];
      const target = spot.target as Character | undefined;

      spot.move(delta);

      if (target && spot.isCollided) {
        spot.destroy();
        target.hits.delete(spot.id);
        target.decreaseHealth(10);
        target.updateHealthBar(10);
      }
      if (target && target.health <= 0) {
        target.kill();
      }
      if (spot.destroyed) {
        this.#spots.splice(i, 1);
        i--;
      }
      if (target?.killed && !target.hits.size) {
        target.destroy();
      }
    }
  }

  /**
   * Abstract method to update the health bar.
   */
  updateHealthBar(_: number): void {}

  private decreaseHealth(value: number): void {
    this.#health -= value;
  }
}
