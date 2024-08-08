import { Actor, ActorConfig, ActorConfigMetrics } from './Actor';
import { Character } from './Character';

interface ProjectileConfigMetrics extends ActorConfigMetrics {
  speed: number;
}
interface ProjectileConfig extends ActorConfig {
  metrics: ProjectileConfigMetrics;
  target: Character;
}

export class Projectile extends Actor {
  id = Math.random().toString(36).substr(2, 9);

  constructor(config: ProjectileConfig) {
    super(config);
  }

  get isCollided(): boolean {
    if (!this.target) return true;
    const distance = Math.sqrt(
      Math.pow(this.position.x - this.target.position.x, 2) +
        Math.pow(this.position.y - this.target.position.y, 2)
    );

    return distance <= 1;
  }

  move(delta: number): void {
    if (!this.target) return;
    const targetX = this.target.position.x - this.position.x;
    const targetY = this.target.position.y - this.position.y;

    const distance = Math.sqrt(targetX * targetX + targetY * targetY);

    this.position.x += (targetX / distance) * delta * this.speed;
    this.position.y += (targetY / distance) * delta * this.speed;
  }
}
