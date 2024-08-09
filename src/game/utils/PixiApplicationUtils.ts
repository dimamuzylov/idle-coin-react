import { Application } from 'pixi.js';
import { Hero } from '../source/Hero';

export const findHeroObject = (app: Application): Hero => {
  return app.stage.children.find((child) => child instanceof Hero) as Hero;
};
