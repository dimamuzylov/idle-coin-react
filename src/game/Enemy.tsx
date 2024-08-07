import { Graphics } from '@pixi/react';

type EnemyProps = {
  size: { width: number; height: number };
  position: { x: number; y: number };
};

const Enemy = ({ size, position }: EnemyProps) => {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, { r: 255, g: 0, b: 0 });
        g.beginFill({ r: 255, g: 0, b: 0 });
        g.drawRect(position.x, position.y, size.width, size.height);
      }}
    />
  );
};

export default Enemy;
