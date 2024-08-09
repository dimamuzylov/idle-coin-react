import { Texture, Ticker } from 'pixi.js';
import {
  Character,
  CharacterConfig,
  CharacterConfigMetrics,
} from './Character';
import { Health } from './Health';
import { ProjectileConfig } from './Projectile';
import { ProjectileEnemy } from './ProjectileEnemy';

interface EnemyConfigMetrics extends CharacterConfigMetrics {
  speed: number;
}
interface EnemyConfig extends CharacterConfig {
  metrics: EnemyConfigMetrics;
  target: Character;
}

export class Enemy extends Character {
  id = Math.random().toString(36).substr(2, 9);
  #healthBar: Health;

  constructor(config: EnemyConfig) {
    super(config);

    this.#healthBar = new Health({
      x: this.width * 2,
      y: 0,
    });
    this.addChild(this.#healthBar);

    Ticker.shared.add(this.tickerUpdate, this);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC GETTERS                       *
   *                                                            *
   * ************************************************************
   */
  get isCollided(): boolean {
    return (
      this.target.position.x + this.target.width >=
      this.position.x - this.attackRange
    );
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  move(delta: number): void {
    if (!this.target) return;
    this.position.x -= delta * this.speed;
  }

  updateHealthBar(health: number): void {
    this.#healthBar.updateHealth(health);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected generateProjectile(config: ProjectileConfig): ProjectileEnemy {
    return new ProjectileEnemy(config);
  }
  protected createProjectileConfig(target: Character): ProjectileConfig {
    return {
      metrics: {
        position: {
          x: this.worldTransform.tx - this.width / 2,
          y: this.worldTransform.ty - this.height / 2,
        },
        width: 20,
        height: 20,
        speed: 2,
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

  /*
   * ************************************************************
   *                                                            *
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private tickerUpdate(delta: number): void {
    if (!this.killed && !this.target?.killed && !this.isCollided) {
      this.move(delta);
    } else {
      Ticker.shared.remove(this.tickerUpdate, this);
    }
  }
}
