import { create } from 'zustand';
import { Enemy, EnvironmentSize } from '../types/game';

const MAX_ENEMIES_PER_LEVEL = 10;

const getEnemyRandomPosition = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const generateEnemy = (environmentSize: EnvironmentSize): Enemy => ({
  position: {
    x: environmentSize.width,
    y: getEnemyRandomPosition(20, environmentSize.height - 20),
  },
  size: { width: 20, height: 20 },
  speed: Math.random() * (1 - 0.5) + 0.5,
});

type State = {
  enemiesCount: number;
  enemies: Enemy[];
  addEnemy: (environmentSize: EnvironmentSize) => void;
  updateEnemyPosition: (delta: number, stopPosition: number) => void;
};
export const useGameStore = create<State>((set) => ({
  enemiesCount: 100,
  enemies: [],
  addEnemy: (environmentSize: EnvironmentSize) =>
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
}));
