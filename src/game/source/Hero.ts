import { Texture } from 'pixi.js';
import { Character } from './Character';
import { ProjectileConfig } from './Projectile';
import { ProjectileHero } from './ProjectileHero';

export class Hero extends Character {
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
          y: this.worldTransform.ty + this.height / 2,
        },
        width: 20,
        height: 20,
        speed: 10,
        power: this.power,
      },
      textures: {
        actor: Texture.from(
          new URL('../assets/projectile.png', import.meta.url).toString()
        ),
      },
      target,
    };
  }
}
