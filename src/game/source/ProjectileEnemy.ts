import { Projectile } from './Projectile';

export class ProjectileEnemy extends Projectile {
  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC GETTERS                       *
   *                                                            *
   * ************************************************************
   */

  get isCollided(): boolean {
    if (!this.target) return true;
    return this.position.x >= this.target.position.x;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  move(delta: number): void {
    this.position.x -= delta * this.speed;
  }
}
