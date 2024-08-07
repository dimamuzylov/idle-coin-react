import { create } from 'zustand';
import {
  GameBullet,
  GameEnemy,
  GameElementSize,
  GameElementPosition,
} from '../types/game';

const MAX_ENEMIES_PER_LEVEL = 10;

const getEnemyRandomPosition = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const generateEnemy = (environmentSize: GameElementSize): GameEnemy => ({
  position: {
    x: environmentSize.width,
    y: getEnemyRandomPosition(20, environmentSize.height - 20),
  },
  size: { width: 20, height: 20 },
  speed: Math.random() * (1 - 0.5) + 0.5,
});

type State = {
  enemiesCount: number;
  enemies: GameEnemy[];
  addEnemy: (environmentSize: GameElementSize) => void;
  updateEnemyPosition: (delta: number, stopPosition: number) => void;
  bullets: GameBullet[];
  addBullet: (position: GameElementPosition) => void;
  updateBullets: (delta: number) => void;
};
export const useGameStore = create<State>((set) => ({
  enemiesCount: 100,
  enemies: [],
  addEnemy: (environmentSize: GameElementSize) =>
    set((state) =>
      state.enemies.length < MAX_ENEMIES_PER_LEVEL
        ? {
            ...state,
            enemies: [...state.enemies, generateEnemy(environmentSize)],
          }
        : state
    ),
  updateEnemyPosition: (delta, stopPosition) =>
    set((state) => ({
      ...state,
      enemies: state.enemies.map((enemy) => {
        const x = enemy.position.x - delta * enemy.speed;
        enemy.position.x = stopPosition
          ? x > stopPosition
            ? x
            : stopPosition
          : x;
        return enemy;
      }),
    })),
  bullets: [],
  addBullet: (position) =>
    set((state) => ({
      ...state,
      bullets: [...state.bullets, { position }],
    })),
  updateBullets: (delta) =>
    set((state) => {
      const enemy = state.enemies[0];
      return {
        ...state,
        bullets: state.bullets.map((bullet) => {
          if (enemy) {
            const targetX = enemy.position.x - bullet.position.x;
            const targetY = enemy.position.y - bullet.position.y;

            const distance = Math.sqrt(targetX * targetX + targetY * targetY);

            bullet.position.x += (targetX / distance) * delta * 2;
            bullet.position.y += (targetY / distance) * delta * 2;

            return bullet;
          }
          return bullet;
        }),
      };
    }),
}));
