import { Container, Texture, Ticker } from 'pixi.js';
import { Character, CharacterConfig } from './Character';
import { Projectile } from './Projectile';
import { ProjectileHero } from './ProjectileHero';
import { Enemy } from './Enemy.ts';

export class Hero extends Character {
  constructor(config: CharacterConfig) {
    super(config);

    Ticker.shared.add(this.tickerUpdate, this);
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected generateProjectile(target: Character): ProjectileHero {
    return new ProjectileHero({
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
    });
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private tickerUpdate(): void {
    if (this.isLastAttackTimeValid) {
      const closestEnemy = this.getClosestEnemy(this.parent);
      if (closestEnemy) {
        this.attack(closestEnemy);
        this.updateLastAttackTime();
      }
    } else if (this.killed && !this.playing) {
      this.playAnimation('death', 0.2);
      this.onComplete = () => {
        Ticker.shared.remove(this.tickerUpdate, this);
      };
    }
  }

  private getClosestEnemy(container: Container): Enemy | undefined {
    let closestEnemyDistance = Infinity;
    let enemy = undefined;
    let enemiesHealth: Record<string, number> = {};

    /**
     * Predict the health of the enemies after the attack.
     */
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      if (child instanceof Projectile && child.target instanceof Enemy) {
        const enemyHealth = enemiesHealth[child.target.id];
        enemiesHealth[child.target.id] =
          typeof enemyHealth === 'number'
            ? enemyHealth - child.power // If the enemy is in the record, it means that it has been attacked before
            : child.target.health - child.power; // If the enemy is not in the record, it means that it has not been attacked yet
      }
    }

    /**
     * Get the closest enemy.
     * The enemy must be alive and not killed by the previous attack.
     */
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      if (
        child instanceof Enemy && // Check if the child is an enemy
        child.position.x < closestEnemyDistance && // Check if the enemy is closer than the previous one
        !child.killed && // Check if the enemy is still alive
        (enemiesHealth[child.id] > 0 || enemiesHealth[child.id] === undefined) // Check if the enemy is still alive after the possible attack
      ) {
        closestEnemyDistance = child.position.x;
        enemy = child;
      }
    }

    return enemy;
  }
}
