import { Stage } from '@pixi/react';
import { useLayoutEffect, useState } from 'react';
import Hero from './Hero';
import EnemyGeneratorEffects from './EnemyGeneratorEffects';
import CharacterEffects from './CharacterEffects';

const calculateSize = () => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight / 2,
});

const Game = () => {
  const [size, setSize] = useState(calculateSize());

  useLayoutEffect(() => {
    const updateSize = () => setSize(calculateSize());
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Stage width={size.width} height={size.height}>
      <Hero
        position={{ x: size.width / 50, y: size.height / 2.5 }}
        width={50}
        height={50}
        attackRange={size.width}
      />
      <EnemyGeneratorEffects />
      <CharacterEffects />
    </Stage>
  );
};

export default Game;
