import { Graphics } from '@pixi/react';

type CharacterProps = {
  size: { width: number; height: number };
  position: { x: number; y: number };
};

const Character = ({ size, position }: CharacterProps) => {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, { r: 30, g: 230, b: 70 });
        g.drawRect(position.x, position.y, size.width, size.height);
      }}
    />
  );
};

export default Character;
