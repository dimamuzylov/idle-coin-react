import { Ticker } from 'pixi.js';
import { Character, CharacterConfig, CharacterConfigMetrics } from './Character';
import { Health } from './Health';
import { ProjectileConfig } from './Projectile';
import { ProjectileEnemy } from './ProjectileEnemy';

export interface EnemyConfigMetrics extends CharacterConfigMetrics {
  speed: number;
}

export interface EnemyConfig extends CharacterConfig {
  metrics: EnemyConfigMetrics;
  target: Character;
}

export abstract class Enemy extends Character {
  id = Math.random().toString(36).substr(2, 9);
  #healthBar: Health;

  protected constructor(config: EnemyConfig) {
    super(config);

    this.anchor.x = 1;
    this.scale.x = -1;

    this.#healthBar = new Health({
      x: 0,
      y: 0,
    });
    this.#healthBar.scale.set(0.1);
    this.#healthBar.x = -this.#healthBar.width / 2 - this.width / 2;
    this.#healthBar.y = -this.#healthBar.height;

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
    return this.target.position.x + this.target.width >= this.position.x - this.attackRange;
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
    this.playMove();
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
  protected abstract generateProjectile(_: ProjectileConfig): ProjectileEnemy;

  protected abstract createProjectileConfig(_: Character): ProjectileConfig;

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
    } else if (!this.target.killed && this.isCollided && this.canAttack) {
      this.attack(this.target);
      this.updateLastAttackTime();
    } else if (this.killed && !this.playing) {
      this.playDeath();
      this.onComplete = () => {
        Ticker.shared.remove(this.tickerUpdate, this);
        this.destroy();
      };
    }
  }
}
