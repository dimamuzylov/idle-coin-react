import { createContext } from 'react';
import {
  GameBullet,
  GameElementPosition,
  GameElementSize,
  GameEnemy,
} from '../../types/game';

type GameContextEnemyState = {
  enemiesCount: number;
  enemies: GameEnemy[];
  addEnemy: (environmentSize: GameElementSize) => void;
  updateEnemies: (delta: number, stopPosition: number) => void;
};

type GameContextBulletState = {
  bullets: GameBullet[];
  addBullet: (position: GameElementPosition) => void;
  updateBullets: (delta: number) => void;
};

type GameContextEnvironmentState = {
  environment: {
    size: GameElementSize;
  };
  character: {
    position: GameElementPosition;
  };
  setEnvironment: (environment: { size: GameElementSize }) => void;
  setCharacter: (character: { position: GameElementPosition }) => void;
};

export type GameContextState = GameContextEnemyState &
  GameContextBulletState &
  GameContextEnvironmentState;

export const GameContext = createContext({
  enemiesCount: 100,
  enemies: [],
  bullets: [],
} as unknown as GameContextState);
