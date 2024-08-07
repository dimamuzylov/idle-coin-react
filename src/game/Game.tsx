import { Stage } from '@pixi/react';
import Environment from './Environment';
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Defense from './Defense';
import Character from './Character';
import Enemy from './Enemy';
import { GameElementSize } from '../types/game';
import Bullet from './Bullet';
import { GameContext } from '../context/game/GameContext';

const calculateSize = (): GameElementSize => ({
  width: document.body.clientWidth,
  height: document.body.clientHeight / 2,
});

const Game = () => {
  const [size, setSize] = useState(calculateSize());
  const gameContext = useContext(GameContext);

  const defenseRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    gameContext.setEnvironment({ size });
  }, [size.width]);

  useEffect(() => {
    const characterPosition = characterRef.current?.transform.worldTransform;
    if (characterPosition) {
      gameContext.setCharacter({
        position: {
          x: characterPosition.tx,
          y: characterPosition.ty,
        },
      });
    }
  }, [characterRef.current]);

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
          gameContext.updateEnemies(delta, stopPosition);
          gameContext.updateBullets(delta);
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
        {gameContext.bullets.map((bullet, index) => (
          <Bullet position={bullet.position} key={index} />
        ))}
        {gameContext.enemies.map((enemy, index) => (
          <Enemy position={enemy.position} size={enemy.size} key={index} />
        ))}
      </Environment>
    </Stage>
  );
};

export default Game;
