import { Projectile } from './Projectile';

export class ProjectileHero extends Projectile {
  /*
   * ************************************************************
   *                                                            *
   *                       PROTECTED METHODS                    *
   *                                                            *
   * ************************************************************
   */
  protected get isCollided(): boolean {
    if (!this.target) return true;
    const distance = Math.sqrt(
      Math.pow(this.target.position.x - this.position.x, 2) + Math.pow(this.target.position.y - this.position.y, 2),
    );
    return distance <= this.width;
  }

  protected move(delta: number): void {
    if (!this.target) return;
    const targetX = this.target.position.x - this.position.x;
    const targetY = this.target.position.y - this.position.y;

    const distance = Math.sqrt(targetX * targetX + targetY * targetY);

    this.rotation = this.rotateToPoint(
      this.target.position.x,
      this.target.position.y,
      this.position.x,
      this.position.y,
    );

    this.position.x += (targetX / distance) * delta * this.speed;
    this.position.y += (targetY / distance) * delta * this.speed;
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PRIVATE METHODS                      *
   *                                                            *
   * ************************************************************
   */
  private rotateToPoint(tx: number, ty: number, x: number, y: number) {
    const distY = ty - y;
    const distX = tx - x;
    return Math.atan2(distY, distX);
  }
}
