import { Texture } from 'pixi.js';
import { Character } from './Character';
import { ProjectileConfig } from './Projectile';
import { ProjectileHero } from './ProjectileHero';

export class Hero extends Character {
  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                    *
   *                                                            *
   * ************************************************************
   */
  playDeath(callback?: () => void): void {
    super.playDeath();
    this.onComplete = callback;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected generateProjectile(config: ProjectileConfig): ProjectileHero {
    return new ProjectileHero(config);
  }

  protected createProjectileConfig(target: Character): ProjectileConfig {
    return {
      metrics: {
        position: {
          x: this.worldTransform.tx + this.width / 2,
          y: this.worldTransform.ty,
        },
        width: 20,
        height: 20,
        speed: 10,
        power: this.power,
      },
      textures: {
        actor: [Texture.from(new URL('../assets/projectile.png', import.meta.url).toString())],
      },
      target,
    };
  }
}
