import { Application } from 'pixi.js';
import { useEffect } from 'react';
import { Enemy } from '../source/Enemy';
import { useApp } from '@pixi/react';
import { Projectile } from '../source/Projectile';
import { findHeroObject } from '../utils/PixiApplicationUtils';
import { useGameStore } from '../store/game';

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
      closestEnemyDistance = child.position.x;
      enemy = child;
    }
  }

  return enemy;
};

const CharacterEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const hero = findHeroObject(app);

    if (hero) {
      interval = setInterval(() => {
        if (hero.killed) gameStore.finish();
        if (hero.killed || !gameStore.playing || gameStore.paused)
          return clearInterval(interval);

        const enemy = getClosestEnemy(app);
        if (enemy) {
          hero.attack(enemy);
          clearInterval(interval);
        }

        app.stage.children.forEach((child) => {
          if (child instanceof Enemy && !hero.killed && child.isCollided)
            child.attack(hero);
        });
      }, 300);
    }

    return () => clearInterval(interval);
  }, [gameStore.playing, gameStore.paused]);

  return <></>;
};

export default CharacterEffects;
