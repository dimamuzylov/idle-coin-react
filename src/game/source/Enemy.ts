import { Ticker } from 'pixi.js';
import { Character, CharacterConfig, CharacterConfigMetrics } from './Character';
import { Health } from './Health';
import { ProjectileEnemy } from './ProjectileEnemy';

export interface EnemyConfigMetrics extends CharacterConfigMetrics {
  speed: number;
  attackRange: number;
}

export interface EnemyConfig extends CharacterConfig {
  metrics: EnemyConfigMetrics;
  target: Character;
}

export abstract class Enemy extends Character {
  #id = Math.random().toString(36).substr(2, 9);
  #healthBar: Health;
  #attackRange = 0;

  protected constructor(config: EnemyConfig) {
    super(config);

    this.#attackRange = config.metrics.attackRange;

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
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  get id(): Readonly<string> {
    return this.#id;
  }

  hit(power: number) {
    super.hit(power);
    this.updateHealthBar(this.health);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected abstract generateProjectile(_: Character): ProjectileEnemy;

  /*
   * ************************************************************
   *                                                            *
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private get isCollided(): boolean {
    return this.target.position.x + this.target.width >= this.position.x - this.#attackRange;
  }

  private updateHealthBar(health: number): void {
    this.#healthBar.updateHealth(health);
  }

  private move(delta: number): void {
    if (!this.target) return;
    this.position.x -= delta * this.speed;
    this.playAnimation('move', 0.3);
  }

  private tickerUpdate(delta: number): void {
    if (!this.killed && !this.target?.killed && !this.isCollided) {
      this.move(delta);
    } else if (!this.target.killed && this.isCollided && this.isLastAttackTimeValid) {
      this.attack(this.target);
      this.updateLastAttackTime();
    } else if (this.killed && !this.playing) {
      this.playAnimation('death', 0.2);
      this.onComplete = () => {
        Ticker.shared.remove(this.tickerUpdate, this);
        this.destroy();
      };
    }
  }
}
