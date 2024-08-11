import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Application, Texture } from 'pixi.js';

type WallProps = {
  app: Application;
  cavern: Texture;
  hellAnimations: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('Wall', {
  create({ app, cavern, hellAnimations, containerWidth }: WallProps) {
    const tilemap = new CompositeTilemap();

    const offsetLeft = 16 * 5;
    const tileWidth = 46;
    const tileHeight = 30;
    const width = Math.ceil((containerWidth - offsetLeft) / tileWidth);

    for (let i = 0; i < width; i++) {
      tilemap.tile(cavern, i * tileWidth + offsetLeft, 0, {
        u: 49,
        v: 49,
        tileWidth,
        tileHeight,
      });
    }

    const candleSize = 16;
    const candleMargin = candleSize * 3;
    const canldesCount = Math.ceil(
      (containerWidth - offsetLeft) / candleMargin
    );

    for (let i = 0; i < canldesCount; i++) {
      tilemap.tile(
        hellAnimations,
        offsetLeft + (candleSize + candleMargin * i),
        8,
        {
          u: 16 * 28,
          v: 16 * 14,
          tileWidth: candleSize,
          tileHeight: candleSize,
          animX: 16,
          animCountX: 4,
        }
      );
    }

    tilemap.tileAnim = [0, 0];

    setInterval(() => {
      tilemap.tileAnim[0]++;
      app.render();
    }, 300);

    return tilemap;
  },
});
