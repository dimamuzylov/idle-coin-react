import { Container, Graphics } from '@pixi/react';
import { useEffect, useState } from 'react';

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
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(1, { r: 30, g: 230, b: 70 });
            g.drawRect(
              (defenseSize.width - characterSize.width) / 2,
              (defenseSize.height - characterSize.height) / 2,
              characterSize.width,
              characterSize.height
            );
          }}
        />
      </Container>
    </Container>
  );
};

export default Environment;
