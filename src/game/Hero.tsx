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
    const texture = Texture.from(
      new URL('./assets/hero.png', import.meta.url).toString()
    );
    const projectileTexture = Texture.from(
      new URL('./assets/projectile.png', import.meta.url).toString()
    );
    return new Hero({
      metrics: {
        position: props.position,
        width: props.width,
        height: props.height,
        power: 50,
        attackRange: props.attackRange,
      },
      textures: {
        actor: texture,
        projectile: projectileTexture,
      },
    });
  },
});
