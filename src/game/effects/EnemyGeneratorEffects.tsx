import { useApp } from '@pixi/react';
import { useEffect } from 'react';
import { Enemy } from '../source/Enemy';
import { Texture } from 'pixi.js';
import { findHeroObject } from '../utils/PixiApplicationUtils';
import { useGameStore } from '../store/game';

const EnemyGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const hero = findHeroObject(app);

    if (hero) {
      interval = setInterval(() => {
        if (hero.killed || !gameStore.playing || gameStore.paused)
          return clearInterval(interval);

        const enemy = new Enemy({
          metrics: {
            position: {
              x: app.screen.width,
              y: Math.floor(
                Math.random() * (app.screen.height - 40 - 20 + 1) + 20
              ),
            },
            width: 20,
            height: 20,
            power: 5,
            speed: Math.random() * (1 - 0.5) + 0.5,
            attackRange: 5,
          },
          textures: {
            actor: Texture.from(
              new URL('../assets/enemy.png', import.meta.url).toString()
            ),
          },
          target: hero,
        });
        app.stage.addChild(enemy);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [gameStore.playing, gameStore.paused]);
  return <></>;
};

export default EnemyGeneratorEffects;
