import { Projectile } from './Projectile';

export class ProjectileEnemy extends Projectile {
  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected get isCollided(): boolean {
    if (!this.target) return true;
    return this.position.x >= this.target.position.x;
  }

  protected move(delta: number): void {
    this.position.x -= delta * this.speed;
  }
}
