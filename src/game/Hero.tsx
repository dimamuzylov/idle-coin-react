import { PixiComponent } from '@pixi/react';
import { Hero } from './source/Hero';
import { type IPointData, Texture } from 'pixi.js';

type HeroProps = {
  position: IPointData;
  width: number;
  height: number;
  attackRange: number;
};

export default PixiComponent('Hero', {
  create: (props: HeroProps) => {
    return new Hero({
      metrics: {
        position: props.position,
        width: props.width,
        height: props.height,
        power: 50,
        attackRange: props.attackRange,
      },
      textures: {
        actor: Texture.from(
          new URL('./assets/hero.png', import.meta.url).toString()
        ),
      },
      target: undefined,
    });
  },
});
