import { useApp } from '@pixi/react';
import { useEffect } from 'react';
import { useGameStore } from '../store/game';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import { Hero } from '../source/Hero';
import { findHeroObject } from '../utils/PixiApplicationUtils';

const createHeroSheet = () => {
  const sheet = BaseTexture.from(
    new URL('../assets/hero_sprite.png', import.meta.url).toString()
  );
  const width = 16;
  const height = 18;
  const x = 9;
  const y = 141;

  return {
    idle: [new Texture(sheet, new Rectangle(x + width * 10, y, width, height))],
    attack: [
      new Texture(sheet, new Rectangle(x + width * 10, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 8, y, width, height)),
      new Texture(sheet, new Rectangle(x, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 2, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 4, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 6, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 8, y, width, height)),
      new Texture(sheet, new Rectangle(x + width * 10, y, width, height)),
    ],
  };
};

const HeroGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();

  useEffect(() => {
    if (!findHeroObject(app)) {
      const heroSheet = createHeroSheet();
      const hero = new Hero({
        metrics: {
          position: {
            x: app.screen.width / 16 + 16 / 2,
            y: app.screen.height / 2 - 16,
          },
          width: 16,
          height: 16,
          power: 50,
          attackRange: app.screen.width,
        },
        textures: {
          actor: heroSheet.idle,
          actorAttack: heroSheet.attack,
          actorHit: [],
        },
        target: undefined,
      });
      app.stage.addChild(hero);
    }
  }, [gameStore.playing]);

  return <></>;
};

export default HeroGeneratorEffects;
