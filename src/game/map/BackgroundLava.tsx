import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Application, Texture } from 'pixi.js';

const createLava = (
  tilemap: CompositeTilemap,
  texture: Texture,
  x: number,
  y: number,
  xu?: number,
  yv?: number,
  height?: number
): void => {
  tilemap.tile(texture, x, y, {
    u: xu || 16,
    v: yv || 16 * 8,
    tileWidth: 16 * 5,
    tileHeight: height || 16 * 2,
    animX: 16 * 6,
    animCountX: 4,
  });
};

type BackgroundLavaProps = {
  app: Application;
  hellAnimations: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('BackgroundLava', {
  create({ app, hellAnimations, containerHeight }: BackgroundLavaProps) {
    const tilemap = new CompositeTilemap();

    createLava(tilemap, hellAnimations, 0, 0);

    const hellAnimationHeight = Math.ceil(containerHeight - 16 * 4);
    for (let i = 0; i < hellAnimationHeight / 16; i++) {
      createLava(tilemap, hellAnimations, 0, 16 * 2 + i * 16, 16, 16 * 9, 16);
    }

    createLava(
      tilemap,
      hellAnimations,
      0,
      containerHeight - 16 * 2,
      16,
      16 * 9
    );

    tilemap.tileAnim = [0, 0];

    setInterval(() => {
      tilemap.tileAnim[0]++;
      app.render();
    }, 300);

    return tilemap;
  },
});
