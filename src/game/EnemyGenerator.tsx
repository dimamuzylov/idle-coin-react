import { useApp, useTick } from '@pixi/react';
import { useEffect } from 'react';
import { Enemy } from './source/Enemy';
import { Texture } from 'pixi.js';
import { Hero } from './source/Hero';

const EnemyGenerator = () => {
  const app = useApp();
  const texture = Texture.from(
    new URL('./assets/enemy.png', import.meta.url).toString()
  );
  const projectileTexture = Texture.from(
    new URL('./assets/projectile.png', import.meta.url).toString()
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const hero = app.stage.children.find(
      (child) => child instanceof Hero
    ) as Hero;

    interval = setInterval(() => {
      if (hero) {
        const enemy = new Enemy({
          metrics: {
            position: {
              x: app.screen.width,
              y: Math.floor(
                Math.random() * (app.screen.height - 40 - 20 + 1) + 20
              ),
            },
            width: 20,
            height: 20,
            power: 5,
            speed: Math.random() * (1 - 0.5) + 0.5,
          },
          textures: {
            actor: texture,
            projectile: projectileTexture,
          },
          target: hero,
        });
        app.stage.addChild(enemy);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useTick((delta) => {
    app.stage.children.forEach((child) => {
      if (child instanceof Enemy && !child.killed) {
        child.moveForward(delta);
      }
    });
  });

  return <></>;
};

export default EnemyGenerator;
