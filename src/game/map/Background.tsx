import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Texture } from 'pixi.js';
import { randomNumberFromTo } from '../utils/RandomUtils';

const createSimpleBackground = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerWidth: number,
  containerHeight: number
): void => {
  const tileSize = 16;
  const width = Math.ceil(containerWidth / tileSize);
  const height = Math.ceil(containerHeight / tileSize);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      tilemap.tile(texture, i * tileSize, j * tileSize, {
        u: 16,
        v: 16 * 8,
        tileWidth: tileSize,
        tileHeight: tileSize,
      });
    }
  }
};

const createRandomBackgroundPattern = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerWidth: number,
  containerHeight: number
): void => {
  const offsetLeft = 16 * 5;
  const offsetTop = 30;
  const blockSize = 16;
  const width = Math.ceil((containerWidth - offsetLeft) / blockSize);
  const height = Math.ceil((containerHeight - offsetTop) / blockSize);
  const totalBlock = Math.ceil(width) * Math.ceil(height);

  const twentyPercentsCounts = (totalBlock * 5) / 100; // 5% of blocks will be different

  for (let i = 0; i < twentyPercentsCounts; i++) {
    const x = Math.floor(Math.random() * width) * blockSize;
    const y = Math.floor(Math.random() * height) * blockSize;

    tilemap.tile(texture, offsetLeft + x, offsetTop + y, {
      u: 16 * 5 + randomNumberFromTo(1, 10) * blockSize,
      v: 0,
      tileWidth: blockSize,
      tileHeight: blockSize,
    });
  }
};

type BackgroundProps = {
  hell: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('Background', {
  create({ hell, containerWidth, containerHeight }: BackgroundProps) {
    const tilemap = new CompositeTilemap();

    createSimpleBackground(tilemap, hell, containerWidth, containerHeight);
    createRandomBackgroundPattern(
      tilemap,
      hell,
      containerWidth,
      containerHeight
    );

    return tilemap;
  },
});
