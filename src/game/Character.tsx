import { Graphics } from '@pixi/react';
import { useEffect, useState } from 'react';

type CharacterProps = {
  environmentSize: { width: number; height: number };
};

const calculateCharacterSize = (size: { width: number; height: number }) => ({
  width: size.width / 6,
  height: size.height / 4,
});

const Character = ({ environmentSize }: CharacterProps) => {
  const [characterSize, setCharacterSize] = useState(
    calculateCharacterSize(environmentSize)
  );

  useEffect(() => {
    setCharacterSize(calculateCharacterSize(environmentSize));
  }, [environmentSize]);

  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, { r: 30, g: 230, b: 70 });
        g.drawRect(
          (environmentSize.width - characterSize.width) / 2,
          (environmentSize.height - characterSize.height) / 2,
          characterSize.width,
          characterSize.height
        );
      }}
    />
  );
};

export default Character;
