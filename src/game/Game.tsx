import { Graphics, Stage } from '@pixi/react';
import Environment from './Environment';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Defense from './Defense';
import Character from './Character';
import Enemy from './Enemy';
import { useGameStore } from '../store/game';
import { GameElementSize } from '../types/game';
import Bullet from './Bullet';

const calculateSize = (): GameElementSize => ({
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
  const bullets = useGameStore((state) => state.bullets);
  const addBullet = useGameStore((state) => state.addBullet);
  const updateBullets = useGameStore((state) => state.updateBullets);
  const defenseRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enemiesCount > 0) {
      interval = setInterval(() => {
        addEnemy(size);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [enemiesCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enemiesCount > 0) {
      interval = setInterval(() => {
        const characterPosition = characterRef.current.transform.worldTransform;
        addBullet({ x: characterPosition.tx, y: characterPosition.ty });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [enemiesCount]);

  useLayoutEffect(() => {
    const updateSize = () => setSize(calculateSize());
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {}, [defenseRef.current, characterRef.current]);

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
          updateBullets(delta);
        });
      }}
    >
      <Environment environmentSize={size}>
        <Defense environmentSize={size} ref={defenseRef}>
          {defenseRef.current && (
            <Character
              environmentSize={defenseRef.current}
              ref={characterRef}
            />
          )}
        </Defense>
        {bullets.map((bullet, index) => (
          <Bullet position={bullet.position} key={index} />
        ))}
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(1, { r: 30, g: 230, b: 70 });
            g.drawRect(size.width / 2, 10, 1, size.height - 20);
          }}
        />
        {enemies.map((enemy, index) => (
          <Enemy position={enemy.position} size={enemy.size} key={index} />
        ))}
      </Environment>
    </Stage>
  );
};

export default Game;
