import { Container, Graphics } from '@pixi/react';
import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { GameElementSize } from '../types/game';

type CharacterProps = {
  environmentSize: GameElementSize;
  children?: ReactNode;
};

const calculateCharacterSize = (size: {
  width: number;
  height: number;
}): GameElementSize => ({
  width: size.width / 6,
  height: size.height / 4,
});

const Character = forwardRef(
  ({ environmentSize, children }: CharacterProps, ref) => {
    const characterRef = useRef(null);
    const [characterSize, setCharacterSize] = useState(
      calculateCharacterSize(environmentSize)
    );

    useEffect(() => {
      setCharacterSize(calculateCharacterSize(environmentSize));
    }, [environmentSize]);

    useImperativeHandle(ref, () => characterRef.current);

    return (
      <Container
        position={[
          (environmentSize.width - characterSize.width) / 2,
          (environmentSize.height - characterSize.height) / 2,
        ]}
      >
        <Graphics
          ref={characterRef}
          draw={(g) => {
            g.clear();
            g.lineStyle(1, { r: 30, g: 230, b: 70 });
            g.drawRect(0, 0, characterSize.width, characterSize.height);
          }}
        />
        {children}
      </Container>
    );
  }
);

export default Character;
