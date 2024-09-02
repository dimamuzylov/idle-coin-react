import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { Sprite, Texture } from 'pixi.js';
import { findHeroObject } from '../utils/PixiApplicationUtils';
import { useGameStore } from '../store/game';
import { randomNumberFromTo } from '../utils/RandomUtils';
import { Enemy1 } from '../source/enemies/Enemy1';

const EnemyGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();
  const [emptySprite, setEmptySprite] = useState<Sprite | null>(null);

  useEffect(() => {
    // @ts-ignore
    let interval: NodeJS.Timeout;

    if (!emptySprite) {
      const sprite = new Sprite(Texture.EMPTY);
      sprite.width = 80;
      app.stage.addChild(sprite);
      setEmptySprite(sprite);
    }
    const hero = findHeroObject(app);

    if (emptySprite && hero) {
      interval = setInterval(() => {
        if (hero.killed || !gameStore.playing || gameStore.paused) return clearInterval(interval);

        const enemy = new Enemy1({
          metrics: {
            position: {
              x: app.screen.width,
              y: randomNumberFromTo(16, app.screen.height - 32),
            },
            width: 16,
            height: 16,
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
