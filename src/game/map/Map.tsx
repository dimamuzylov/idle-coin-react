import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';
import Background from './Background';
import { useApp } from '@pixi/react';
import BackgroundLava from './BackgroundLava';
import BackgroundLavaSplash from './BackgroundLavaSplash';
import BackgroundRocks from './BackgroundRocks';
import Wall from './Wall';
import Plartform from './Plartform';

type MapProps = {
  containerWidth: number;
  containerHeight: number;
};
const Map = (props: MapProps) => {
  const app = useApp();
  const [texture, setTexture] = useState<
    { hell: Texture; hellAnimations: Texture; cavern: Texture } | undefined
  >(undefined);

  useEffect(() => {
    if (!texture) {
      Promise.all([
        Texture.fromURL(
          new URL('../assets/hell_tileset.png', import.meta.url).toString()
        ),
        Texture.fromURL(
          new URL(
            '../assets/hell_animations_tileset.png',
            import.meta.url
          ).toString()
        ),
        Texture.fromURL(
          new URL('../assets/cavern_tileset.png', import.meta.url).toString()
        ),
      ]).then(([hell, hellAnimations, cavern]) => {
        setTexture({ hell, hellAnimations, cavern });
      });
    }
  }, []);

  if (!texture) return <></>;

  return (
    <>
      <Background {...props} hell={texture.hell} />
      <Wall {...props} {...texture} app={app} />
      <BackgroundLava {...props} {...texture} app={app} />
      <BackgroundLavaSplash {...props} {...texture} app={app} />
      <BackgroundRocks {...props} {...texture} />
      <Plartform {...props} {...texture} />
    </>
  );
};

export default Map;
