import { PixiComponent, useApp, useTick } from '@pixi/react';
import { Hero } from './source/Hero';
import { type IPointData, Texture, Application } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { Enemy } from './source/Enemy';

type HeroProps = {
  position: IPointData;
  width: number;
  height: number;
};

const PixiComponentHero = PixiComponent('Hero', {
  create: (props: HeroProps) => {
    const texture = Texture.from(
      new URL('./assets/hero.png', import.meta.url).toString()
    );
    const projectileTexture = Texture.from(
      new URL('./assets/projectile.png', import.meta.url).toString()
    );
    return new Hero({
      metrics: {
        position: props.position,
        width: props.width,
        height: props.height,
        power: 50,
      },
      textures: {
        actor: texture,
        projectile: projectileTexture,
      },
    });
  },
});

const getClosestEnemy = (app: Application): Enemy | undefined => {
  let closestEnemyX = app.view.width;
  let enemy = undefined;
  for (let i = 0; i < app.stage.children.length; i++) {
    const child = app.stage.children[i];
    if (
      child instanceof Enemy &&
      child.position.x < closestEnemyX &&
      !child.killed
    ) {
      if (child.position.x < closestEnemyX) {
        closestEnemyX = child.position.x;
        enemy = child;
      }
    }
  }
  return enemy;
};
const HeroComponent = (props: HeroProps) => {
  const app = useApp();
  const heroRef = useRef<Hero>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (heroRef.current) {
      interval = setInterval(() => {
        const enemy = getClosestEnemy(app);
        if (enemy) {
          heroRef.current!.attack(enemy);
          heroRef.current!.spots.forEach((bullet) =>
            app.stage.addChild(bullet)
          );
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [heroRef.current]);

  useTick((delta) => {
    if (heroRef.current) {
      heroRef.current.realign(delta);
    }
  });

  return <PixiComponentHero {...props} ref={heroRef} />;
};

export default HeroComponent;
