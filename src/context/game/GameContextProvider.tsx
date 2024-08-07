import { ReactNode, useEffect, useState } from 'react';
import { GameContext, GameContextState } from './GameContext';
import { GameElementPosition, GameElementSize } from '../../types/game';
import {
  generateEnemy,
  updateBulletPosition,
  updateEnemyPosition,
} from './GameContextUtils';

type GameContextProviderProps = {
  children: ReactNode;
};

const MAX_ENEMIES_PER_LEVEL = 10;

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [state, setState] = useState({
    enemiesCount: 100,
    enemies: [],
    bullets: [],
  } as unknown as GameContextState);

  const addEnemy = (environmentSize: GameElementSize) => {
    setState((state) =>
      state.enemies.length < MAX_ENEMIES_PER_LEVEL
        ? {
            ...state,
            enemies: [...state.enemies, generateEnemy(environmentSize)],
          }
        : state
    );
  };
  const addBullet = (position: GameElementPosition) => {
    setState((state) => ({
      ...state,
      bullets: [...state.bullets, { position }],
    }));
  };
  const updateEnemies = (delta: number, stopPosition: number) => {
    setState((state) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        updateEnemyPosition(enemy, delta, stopPosition)
      ),
    }));
  };

  const updateBullets = (delta: number) => {
    setState((state) => {
      const enemy = state.enemies[0];
      if (!enemy) return state;
      return {
        ...state,
        bullets: state.bullets.map((bullet) =>
          updateBulletPosition(bullet, enemy, delta)
        ),
      };
    });
  };

  const setEnvironment = ({ size }: { size: GameElementSize }) => {
    setState((state) => ({
      ...state,
      environment: { size },
    }));
  };

  const setCharacter = ({ position }: { position: GameElementPosition }) => {
    setState((state) => ({
      ...state,
      character: { position },
    }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.enemiesCount > 0 && state.environment) {
      interval = setInterval(() => {
        addEnemy(state.environment.size);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.enemiesCount, state.environment]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.character && state.enemies.length) {
      interval = setInterval(() => {
        addBullet({
          x: state.character.position.x,
          y: state.character.position.y,
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [state.character, state.enemies[0]]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        addEnemy,
        addBullet,
        updateEnemies,
        updateBullets,
        setEnvironment,
        setCharacter,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
