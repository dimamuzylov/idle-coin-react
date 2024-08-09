import { Application } from 'pixi.js';
import { useEffect } from 'react';
import { Enemy } from './source/Enemy';
import { Hero } from './source/Hero';
import { useApp } from '@pixi/react';
import { Projectile } from './source/Projectile';

const getClosestEnemy = (app: Application): Enemy | undefined => {
  let closestEnemyDistance = Infinity;
  let enemy = undefined;
  let enemiesHealth: Record<string, number> = {};

  /**
   * Predict the health of the enemies after the attack.
   */
  for (let i = 0; i < app.stage.children.length; i++) {
    const child = app.stage.children[i];
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
  for (let i = 0; i < app.stage.children.length; i++) {
    const child = app.stage.children[i];
    if (
      child instanceof Enemy && // Check if the child is an enemy
      child.position.x < closestEnemyDistance && // Check if the enemy is closer than the previous one
      !child.killed && // Check if the enemy is still alive
      (enemiesHealth[child.id] > 0 || enemiesHealth[child.id] === undefined) // Check if the enemy is still alive after the possible attack
    ) {
      closestEnemyDistance = Math.sqrt(
        Math.pow(child.target.position.x - child.position.x, 2) +
          Math.pow(child.target.position.y - child.position.y, 2)
      );
      enemy = child;
    }
  }

  return enemy;
};

const getHero = (app: Application): Hero => {
  return app.stage.children.find((child) => child instanceof Hero) as Hero;
};

const CharacterEffects = () => {
  const app = useApp();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const hero = getHero(app);

    if (hero) {
      interval = setInterval(() => {
        const enemy = getClosestEnemy(app);
        if (enemy) hero.attack(enemy);
        if (hero.killed) clearInterval(interval);

        app.stage.children.forEach((child) => {
          if (child instanceof Enemy && !hero.killed && child.isCollided)
            child.attack(hero);
        });
      }, 300);
    }

    return () => clearInterval(interval);
  }, []);

  return <></>;
};

export default CharacterEffects;
