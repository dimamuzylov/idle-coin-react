import { Actor } from './Actor';

export class Bullet extends Actor {
  move(delta: number): void {
    const targetX = this.target!.position.x - this.position.x;
    const targetY = this.target!.position.y - this.position.y;

    const distance = Math.sqrt(targetX * targetX + targetY * targetY);

    this.position.x += (targetX / distance) * delta * this.speed;
    this.position.y += (targetY / distance) * delta * this.speed;
  }
}
