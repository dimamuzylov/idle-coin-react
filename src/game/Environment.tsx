import { Container, Graphics } from '@pixi/react';
import { useEffect, useState } from 'react';
import Character from './Character';
import Enemy from './Enemy';

type EnvironmentProps = {
  size: { width: number; height: number };
};

const calculateDefenseSize = (size: { width: number; height: number }) => ({
  width: size.width / 6,
  height: size.height / 4,
});

const calculateCharacterSize = (size: { width: number; height: number }) => ({
  width: size.width / 6,
  height: size.height / 4,
});

const Environment = ({ size }: EnvironmentProps) => {
  const [defenseSize, setDefenseSize] = useState(calculateDefenseSize(size));
  const [characterSize, setCharacterSize] = useState(
    calculateCharacterSize(defenseSize)
  );

  useEffect(() => {
    setDefenseSize(calculateDefenseSize(size));
    setCharacterSize(calculateCharacterSize(defenseSize));
  }, [size]);

  return (
    <Container position={[0, 0]}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(1, { r: 30, g: 230, b: 70 });
          g.drawRect(0, 0, size.width, size.height);
        }}
      />
      <Container position={[0, size.height / 3]}>
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(1, { r: 30, g: 230, b: 70 });
            g.drawRect(0, 0, defenseSize.width, defenseSize.height);
          }}
        />
        <Character
          position={{
            x: (defenseSize.width - characterSize.width) / 2,
            y: (defenseSize.height - characterSize.height) / 2,
          }}
          size={characterSize}
        />
      </Container>
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
    </Container>
  );
};

export default Environment;
