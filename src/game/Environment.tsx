import { Container, Graphics } from '@pixi/react';
import { ReactNode } from 'react';

type EnvironmentProps = {
  environmentSize: { width: number; height: number };
  children?: ReactNode;
};

const Environment = ({ environmentSize, children }: EnvironmentProps) => {
  return (
    <Container position={[0, 0]}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.lineStyle(1, { r: 30, g: 230, b: 70 });
          g.drawRect(0, 0, environmentSize.width, environmentSize.height);
        }}
      />
      {children}
    </Container>
  );
};

export default Environment;
