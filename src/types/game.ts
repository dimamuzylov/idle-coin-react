export type GameElementSize = { width: number; height: number };
export type GameElementPosition = { x: number; y: number };
export type GameEnemy = {
  position: GameElementPosition;
  size: GameElementSize;
  speed: number;
};
export type GameBullet = {
  position: GameElementPosition;
};
