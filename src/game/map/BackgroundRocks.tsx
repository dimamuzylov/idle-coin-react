import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Texture } from 'pixi.js';
import { randomNumberFromTo } from '../utils/RandomUtils';

const createRock = (
  tilemap: CompositeTilemap,
  texture: Texture,
  x: number,
  y: number
): void => {
  tilemap.tile(texture, x, y, {
    u: 16 * 25,
    v: 16 * 5,
    tileWidth: 16,
    tileHeight: 16 * 2,
  });
};

const createBottomRocks = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerWidth: number,
  containerHeight: number
) => {
  const offsetLeft = 16 * 5;
  const tileWidth = 16;
  const tileHeight = 16 * 2;

  const rocksCount = Math.ceil((containerWidth - offsetLeft) / tileWidth);

  for (let i = 0; i < rocksCount; i++) {
    tilemap.tile(
      texture,
      offsetLeft + i * tileWidth,
      containerHeight - tileHeight,
      {
        u: 16 * 5 + randomNumberFromTo(1, 7) * tileWidth,
        v: 16 * 3,
        tileWidth,
        tileHeight,
      }
    );
  }
};

type BackgroundRocksProps = {
  hell: Texture;
  hellAnimations: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('BackgroundRocks', {
  create({
    hell,
    hellAnimations,
    containerWidth,
    containerHeight,
  }: BackgroundRocksProps) {
    const tilemap = new CompositeTilemap();

    createRock(tilemap, hellAnimations, 16, 0);
    createRock(tilemap, hellAnimations, 16 * 3, 16 * 2);
    createRock(tilemap, hellAnimations, 16, containerHeight - 16 * 2);
    createRock(tilemap, hellAnimations, 16 * 3, containerHeight - 16 * 4);

    createBottomRocks(tilemap, hell, containerWidth, containerHeight);

    return tilemap;
  },
});
