import HeroGeneratorEffects from './HeroGeneratorEffects';
import EnemyGeneratorEffects from './EnemyGeneratorEffects';
import { useApp } from '@pixi/react';
import { useGameStore } from '../store/game';
import { useEffect } from 'react';
import { Ticker } from 'pixi.js';

const GameEffects = () => {
  const app = useApp();
  const gameStore = useGameStore();
  app.ticker.autoStart = false;
  Ticker.shared.autoStart = false;

  const startTimer = () => {
    app.ticker.start();
    Ticker.shared.start();
  };

  const stopTimer = () => {
    app.ticker.stop();
    Ticker.shared.stop();
  };

  useEffect(() => {
    if (gameStore.paused) {
      stopTimer();
    } else {
      startTimer();
    }
  }, [gameStore.paused]);

  return (
    <>
      <HeroGeneratorEffects />
      <EnemyGeneratorEffects />
    </>
  );
};

export default GameEffects;
