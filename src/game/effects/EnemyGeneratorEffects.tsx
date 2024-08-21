import { useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { Enemy } from '../source/Enemy';
import { Sprite, Texture } from 'pixi.js';
import { findHeroObject } from '../utils/PixiApplicationUtils';
import { useGameStore } from '../store/game';
import { randomNumberFromTo } from '../utils/RandomUtils';
import { Character } from '../source/Character';

const EnemyGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();
  const [emptySprite, setEmptySprite] = useState<Sprite | null>(null);

  useEffect(() => {
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
        if (hero.killed || !gameStore.playing || gameStore.paused)
          return clearInterval(interval);

        const enemy = new Enemy({
          metrics: {
            position: {
              x: app.screen.width,
              y: randomNumberFromTo(20, app.screen.height - 40),
            },
            width: 20,
            height: 20,
            power: 5,
            speed: Math.random() * (1 - 0.5) + 0.5,
            attackRange: 0,
          },
          textures: {
            actor: [
              Texture.from(
                new URL('../assets/enemy.png', import.meta.url).toString()
              ),
            ],
            actorAttack: [
              Texture.from(
                new URL('../assets/enemy.png', import.meta.url).toString()
              ),
            ],
            actorHit: [
              Texture.from(
                new URL('../assets/enemy.png', import.meta.url).toString()
              ),
            ],
          },
          target: emptySprite as Character,
        });
        app.stage.addChild(enemy);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [gameStore.playing, gameStore.paused]);
  return <></>;
};

export default EnemyGeneratorEffects;
