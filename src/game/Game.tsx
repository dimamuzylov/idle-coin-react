import { Stage } from '@pixi/react';
import { useLayoutEffect, useState } from 'react';
import GameEffects from './effects';
import { useGameStore } from './store/game';
import Map from './map';

const calculateSize = () => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight / 2,
});

const Game = () => {
  const [size, setSize] = useState(calculateSize());
  const gameStore = useGameStore();

  useLayoutEffect(() => {
    const updateSize = () => setSize(calculateSize());
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('blur', () => {
      gameStore.pause();
    });
    window.addEventListener('focus', () => {
      gameStore.play();
    });

    return () => {
      window.removeEventListener('blur', () => {});
      window.removeEventListener('focus', () => {});
    };
  }, []);

  return (
    <Stage width={size.width} height={size.height}>
      <Map containerWidth={size.width} containerHeight={size.height} />
      <GameEffects />
    </Stage>
  );
};

export default Game;
