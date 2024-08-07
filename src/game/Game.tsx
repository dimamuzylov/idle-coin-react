import { Stage } from '@pixi/react';
import Environment from './Environment';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Defense from './Defense';
import Character from './Character';
import Enemy from './Enemy';
import { useGameStore } from '../store/game';

const calculateSize = () => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight / 2,
});

const Game = () => {
  const [size, setSize] = useState(calculateSize());
  const enemiesCount = useGameStore((state) => state.enemiesCount);
  const enemies = useGameStore((state) => state.enemies);
  const addEnemy = useGameStore((state) => state.addEnemy);
  const updateEnemyPosition = useGameStore(
    (state) => state.updateEnemyPosition
  );
  const defenseRef = useRef(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enemiesCount > 0) {
      interval = setInterval(() => {
        addEnemy(size);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [enemiesCount]);

  useLayoutEffect(() => {
    const updateSize = () => setSize(calculateSize());
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {}, [defenseRef.current]);

  return (
    <Stage
      width={size.width}
      height={size.height}
      onMount={(app) => {
        app.ticker.add((delta) => {
          const stopPosition = defenseRef.current
            ? defenseRef.current.width
            : 0;
          updateEnemyPosition(delta, stopPosition);
        });
      }}
    >
      <Environment environmentSize={size}>
        <Defense environmentSize={size} ref={defenseRef}>
          {defenseRef.current && (
            <Character environmentSize={defenseRef.current} />
          )}
        </Defense>
        {enemies.map((enemy, index) => (
          <Enemy position={enemy.position} size={enemy.size} key={index} />
        ))}
      </Environment>
    </Stage>
  );
};

export default Game;
