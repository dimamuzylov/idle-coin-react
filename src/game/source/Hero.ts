import { IPointData, Texture } from 'pixi.js';
import { Character } from './Character';

export class Hero extends Character {
  constructor(
    position: IPointData,
    width: number,
    height: number,
    texture: Texture,
    projectileTexture: Texture
  ) {
    super(position, width, height, texture, projectileTexture);
  }
}
