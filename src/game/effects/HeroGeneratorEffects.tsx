import { useApp } from '@pixi/react';
import { useEffect } from 'react';
import { useGameStore } from '../store/game';
import { Texture } from 'pixi.js';
import { Hero } from '../source/Hero';
import { findHeroObject } from '../utils/PixiApplicationUtils';

const HeroGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();

  useEffect(() => {
    if (!findHeroObject(app)) {
      const hero = new Hero({
        metrics: {
          position: {
            x: app.screen.width / 50,
            y: app.screen.height / 2.5,
          },
          width: 50,
          height: 50,
          power: 50,
          attackRange: app.screen.width,
        },
        textures: {
          actor: Texture.from(
            new URL('../assets/hero.png', import.meta.url).toString()
          ),
        },
        target: undefined,
      });
      app.stage.addChild(hero);
    }
  }, [gameStore.playing]);

  return <></>;
};

export default HeroGeneratorEffects;
