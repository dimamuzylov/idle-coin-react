import { Stage } from '@pixi/react';
import Environment from './Environment';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Defense from './Defense';
import Character from './Character';
import Enemy from './Enemy';

const calculateSize = () => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight / 2,
});

const Game = () => {
  const [size, setSize] = useState(calculateSize());
  const defenseRef = useRef(null);

  useLayoutEffect(() => {
    const updateSize = () => setSize(calculateSize());
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {}, [defenseRef.current]);

  return (
    <Stage width={size.width} height={size.height}>
      <Environment environmentSize={size}>
        <Defense environmentSize={size} ref={defenseRef}>
          {defenseRef.current && (
            <Character environmentSize={defenseRef.current} />
          )}
        </Defense>

        <Enemy
          position={{ x: size.width - 300, y: size.height - 300 }}
          size={{ width: 30, height: 30 }}
        />
        <Enemy
          position={{ x: size.width - 200, y: size.height - 200 }}
          size={{ width: 30, height: 30 }}
        />
        <Enemy
          position={{ x: size.width - 100, y: size.height - 300 }}
          size={{ width: 30, height: 30 }}
        />
      </Environment>
    </Stage>
  );
};

export default Game;
