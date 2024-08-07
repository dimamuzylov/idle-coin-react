import { GameBullet, GameElementSize, GameEnemy } from '../../types/game';

const getEnemyRandomPosition = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
export const generateEnemy = (environmentSize: GameElementSize): GameEnemy => ({
  position: {
    x: environmentSize.width,
    y: getEnemyRandomPosition(20, environmentSize.height - 20),
  },
  size: { width: 20, height: 20 },
  speed: Math.random() * (1 - 0.5) + 0.5,
});
export const updateEnemyPosition = (
  enemy: GameEnemy,
  delta: number,
  stopPosition: number
) => {
  const x = enemy.position.x - delta * enemy.speed;
  enemy.position.x = stopPosition ? (x > stopPosition ? x : stopPosition) : x;
  return enemy;
};

export const updateBulletPosition = (
  bullet: GameBullet,
  enemy: GameEnemy,
  delta: number
) => {
  const targetX = enemy.position.x - bullet.position.x;
  const targetY = enemy.position.y - bullet.position.y;

  const distance = Math.sqrt(targetX * targetX + targetY * targetY);

  bullet.position.x += (targetX / distance) * delta * 2;
  bullet.position.y += (targetY / distance) * delta * 2;

  return bullet;
};
