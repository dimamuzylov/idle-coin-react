import { useApp } from '@pixi/react';
import { useEffect } from 'react';
import { useGameStore } from '../store/game';
import { BaseTexture, Rectangle, Texture } from 'pixi.js';
import { Hero } from '../source/Hero';
import { findHeroObject } from '../utils/PixiApplicationUtils';

const createHeroSheet = () => {
  const sheet = BaseTexture.from(new URL('../assets/hero/hero_sprite.png', import.meta.url).toString());
  const width = 16;
  const height = 18;

  const createActor = (sheet: BaseTexture, width: number, height: number): Texture[] => [
    new Texture(sheet, new Rectangle(137, 141, width, height)),
  ];

  const createActorAttack = (sheet: BaseTexture, width: number, height: number): Texture[] => [
    new Texture(sheet, new Rectangle(137, 141, width, height)),
    new Texture(sheet, new Rectangle(105, 141, width, height)),
    new Texture(sheet, new Rectangle(73, 141, width, height)),
    new Texture(sheet, new Rectangle(41, 141, width, height)),
    new Texture(sheet, new Rectangle(9, 141, width, height)),
    new Texture(sheet, new Rectangle(41, 141, width, height)),
    new Texture(sheet, new Rectangle(73, 141, width, height)),
    new Texture(sheet, new Rectangle(105, 141, width, height)),
  ];

  const createActorHit = (sheet: BaseTexture, width: number, height: number): Texture[] => [
    new Texture(sheet, new Rectangle(8, 269, width, height)),
    new Texture(sheet, new Rectangle(40, 269, width, height)),
    new Texture(sheet, new Rectangle(72, 269, width, height)),
    new Texture(sheet, new Rectangle(104, 269, width, height)),
    new Texture(sheet, new Rectangle(136, 269, width, height)),
    new Texture(sheet, new Rectangle(168, 269, width, height)),
  ];

  const createActorDeath = (sheet: BaseTexture): Texture[] => [
    new Texture(sheet, new Rectangle(7, 306, 19, 14)),
    new Texture(sheet, new Rectangle(39, 306, 19, 14)),
    new Texture(sheet, new Rectangle(71, 306, 19, 14)),
    new Texture(sheet, new Rectangle(103, 306, 19, 14)),
    new Texture(sheet, new Rectangle(135, 306, 19, 14)),
    new Texture(sheet, new Rectangle(167, 306, 19, 14)),
  ];

  return {
    idle: createActor(sheet, width, height),
    attack: createActorAttack(sheet, width, height),
    hit: createActorHit(sheet, width, height),
    death: createActorDeath(sheet),
  };
};

const HeroGeneratorEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();

  useEffect(() => {
    if (!findHeroObject(app) && gameStore.playing) {
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
          attackSpeed: 300,
        },
        textures: {
          actor: heroSheet.idle,
          actorAttack: heroSheet.attack,
          actorHit: heroSheet.hit,
          actorDeath: heroSheet.death,
        },
        target: undefined,
      });
      app.stage.addChild(hero);
    }
  }, [gameStore.playing]);

  return <></>;
};

export default HeroGeneratorEffects;
