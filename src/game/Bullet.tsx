import { Graphics } from '@pixi/react';
import { GameElementPosition } from '../types/game';

type BulletProps = {
  position: GameElementPosition;
};

const Bullet = ({ position }: BulletProps) => {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(1, { r: 30, g: 230, b: 70 });
        g.beginFill({ r: 30, g: 230, b: 70 });
        g.drawRect(position.x, position.y, 2, 2);
      }}
    />
  );
};

export default Bullet;
