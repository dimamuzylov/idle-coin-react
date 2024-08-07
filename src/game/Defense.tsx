import { Container, Graphics } from '@pixi/react';
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { GameElementSize } from '../types/game';

type DefenseProps = {
  environmentSize: GameElementSize;
  children?: ReactNode;
};

const calculateDefenseSize = (size: GameElementSize): GameElementSize => ({
  width: size.width / 6,
  height: size.height / 4,
});

const Defense = forwardRef(
  ({ environmentSize, children }: DefenseProps, ref) => {
    const [defenseSize, setDefenseSize] = useState(
      calculateDefenseSize(environmentSize)
    );

    useEffect(() => {
      setDefenseSize(calculateDefenseSize(environmentSize));
    }, [environmentSize]);

    useImperativeHandle(ref, () => defenseSize);

    return (
      <Container position={[0, environmentSize.height / 3]}>
        <Graphics
          draw={(g) => {
            g.clear();
            g.lineStyle(1, { r: 30, g: 230, b: 70 });
            g.drawRect(0, 0, defenseSize.width, defenseSize.height);
          }}
        />
        {children}
      </Container>
    );
  }
);

export default Defense;
