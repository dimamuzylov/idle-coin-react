import { PixiComponent } from '@pixi/react';
import { CompositeTilemap } from '@pixi/tilemap';
import { Texture } from 'pixi.js';

const createTopFloor = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerHeight: number,
  platformHeight: number
): void => {
  const platformBorder = 8;
  const x = 19;
  const y = containerHeight / 2 - (platformHeight - platformBorder) / 2;
  const tileSize = 14;

  tilemap.tile(texture, x, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 2,
  });

  tilemap.tile(texture, x + tileSize, y, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });

  tilemap.tile(texture, x + tileSize * 2, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
};

const createMiddleFloor = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerHeight: number,
  platformHeight: number
) => {
  const tileSize = 14;
  const platformBorder = 5;
  const padding = 2;
  const platformOffsetTop = tileSize + padding;
  const x = platformBorder;
  const y =
    containerHeight / 2 -
    (platformHeight - platformBorder) / 2 +
    platformOffsetTop;

  /** FIRST ROW */
  tilemap.tile(texture, x, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 2,
  });
  tilemap.tile(texture, x + tileSize, y, {
    u: 193,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 2, y, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 3, y, {
    u: 209,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 4, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });

  /** SECOND ROW */
  const secondRowY = y + tileSize * 1.15;
  tilemap.tile(texture, x, secondRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 2,
  });
  tilemap.tile(texture, x + tileSize, secondRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 2, secondRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 3, secondRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 4, secondRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });

  /** THIRD ROW */
  const thirdRowY = y + tileSize * 2.3;
  tilemap.tile(texture, x, thirdRowY, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 4,
  });
  tilemap.tile(texture, x + tileSize, thirdRowY, {
    u: 193,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 2, thirdRowY, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 3, thirdRowY, {
    u: 209,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });
  tilemap.tile(texture, x + tileSize * 4, thirdRowY, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 6,
  });
};

const createBottomFloor = (
  tilemap: CompositeTilemap,
  texture: Texture,
  containerHeight: number,
  platformHeight: number
): void => {
  const tileSize = 14;
  const platformBorder = 17;
  const x = 19;
  const y =
    containerHeight / 2 -
    platformHeight / 2 +
    platformHeight -
    tileSize -
    platformBorder;

  tilemap.tile(texture, x, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 4,
  });

  tilemap.tile(texture, x + tileSize, y, {
    u: 97,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
  });

  tilemap.tile(texture, x + tileSize * 2, y, {
    u: 177,
    v: 81,
    tileWidth: tileSize,
    tileHeight: tileSize,
    rotate: 6,
  });
};

type PlartformProps = {
  hell: Texture;
  containerWidth: number;
  containerHeight: number;
};
export default PixiComponent('Plartform', {
  create({ hell, containerHeight }: PlartformProps) {
    const tilemap = new CompositeTilemap();

    const tileWidth = 80;
    const tileHeight = 96;

    createTopFloor(tilemap, hell, containerHeight, tileHeight);
    createMiddleFloor(tilemap, hell, containerHeight, tileHeight);
    createBottomFloor(tilemap, hell, containerHeight, tileHeight);

    tilemap.tile(hell, 0, containerHeight / 2 - tileHeight / 2, {
      u: 176,
      v: 96,
      tileWidth,
      tileHeight,
    });

    return tilemap;
  },
});
