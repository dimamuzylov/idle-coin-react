import { Texture } from 'pixi.js';
import { Actor, ActorConfigMetrics, ActorConfigTexture } from './Actor';
import { Projectile } from './Projectile';

export interface CharacterConfigMetrics extends ActorConfigMetrics {
  power: number;
}
export interface CharacterConfigTexture extends ActorConfigTexture {
  projectile: Texture;
}
export type CharacterConfig = {
  metrics: CharacterConfigMetrics;
  textures: CharacterConfigTexture;
  target?: Character;
};

export class Character extends Actor {
  readonly #spots: Projectile[] = [];
  readonly #hits = new Set<string>(); // Set of projectile ids
  #projectileTexture: Texture;
  #health = 100;
  #power = 10;
  #killed = false;

  constructor(config: CharacterConfig) {
    super(config);

    this.#power = config.metrics.power;
    this.#projectileTexture = config.textures.projectile;
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

  get killed(): boolean {
    return this.#killed;
  }

  kill(): void {
    this.#killed = true;
  }

  attack(target: Character): void {
    const spot = new Projectile({
      metrics: {
        position: {
          x: this.worldTransform.tx + this.width / 2,
          y: this.worldTransform.ty + this.height / 2,
        },
        width: 20,
        height: 20,
        speed: 4,
      },
      textures: {
        actor: this.#projectileTexture,
      },
      target,
    });
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
        target.decreaseHealth(this.#power);
        target.updateHealthBar(this.#power);
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
