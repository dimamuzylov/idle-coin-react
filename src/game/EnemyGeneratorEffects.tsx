import { useApp } from '@pixi/react';
import { useEffect } from 'react';
import { Enemy } from './source/Enemy';
import { Application, Texture } from 'pixi.js';
import { Hero } from './source/Hero';

const getHero = (app: Application): Hero => {
  return app.stage.children.find((child) => child instanceof Hero) as Hero;
};

const EnemyGeneratorEffects = () => {
  const app = useApp();
  const texture = Texture.from(
    new URL('./assets/enemy.png', import.meta.url).toString()
  );
  const projectileTexture = Texture.from(
    new URL('./assets/projectile.png', import.meta.url).toString()
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const hero = getHero(app);

    if (hero) {
      interval = setInterval(() => {
        if (hero.killed) clearInterval(interval);

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
            attackRange: 5,
          },
          textures: {
            actor: texture,
            projectile: projectileTexture,
          },
          target: hero,
        });
        app.stage.addChild(enemy);
      }, 500);
    }

    return () => clearInterval(interval);
  }, []);
  return <></>;
};

export default EnemyGeneratorEffects;
