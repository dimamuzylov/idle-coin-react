import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { AnimatedSprite, Application, Texture } from 'pixi.js';
import { randomNumberFromTo } from '../utils/RandomUtils';

const createLavaSplash = (
  tilemap: CompositeTilemap,
  texture: Texture,
  x: number,
  y: number
): void => {
  tilemap.tile(texture, x, y, {
    u: 16 * 12,
    v: 16 * 13,
    tileWidth: 16,
    tileHeight: 16,
    animX: 16,
    animCountX: 6,
  });
};

type BackgroundLavaTxuaProps = {
  app: Application;
  hellAnimations: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('BackgroundLavaSplash', {
  create({ app, hellAnimations, containerHeight }: BackgroundLavaTxuaProps) {
    const tilemap = new CompositeTilemap();
    AnimatedSprite;
    const lavaTxuaCount = Math.ceil(containerHeight / (16 * 3));
    const lavaTxuaHalfCount = Math.floor(lavaTxuaCount / 2);

    tilemap.tileAnim = [0, 0];

    setInterval(() => {
      tilemap.clear();
      for (let i = 0; i < lavaTxuaHalfCount; i++) {
        const x = randomNumberFromTo(16 / 2, 16 * 4);
        const y = randomNumberFromTo(16, containerHeight / 4);
        createLavaSplash(tilemap, hellAnimations, x, y);
      }

      for (let i = 0; i < lavaTxuaHalfCount; i++) {
        const x = randomNumberFromTo(16 / 2, 16 * 4);
        const y = randomNumberFromTo(containerHeight / 1.4, containerHeight);
        createLavaSplash(tilemap, hellAnimations, x, y);
      }
      let interval = setInterval(() => {
        tilemap.tileAnim[0]++;
        app.render();

        if (tilemap.tileAnim[0] % 6 === 0) {
          tilemap.tileAnim[0] = 0;
          tilemap.clear();
          clearInterval(interval);
        }
      }, 150);
    }, 1500);

    return tilemap;
  },
});
