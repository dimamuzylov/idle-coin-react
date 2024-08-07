import { Stage } from '@pixi/react';
import Environment from './Environment';
import { useLayoutEffect, useState } from 'react';

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
      <Environment size={size} />
    </Stage>
  );
};

export default Game;
