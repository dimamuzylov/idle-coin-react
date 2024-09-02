import { Graphics, IPointData } from 'pixi.js';

export class Health extends Graphics {
  #width = 100;
  #height = 20;

  constructor(position: IPointData) {
    super();

    this.position = position;
    this.beginFill(0xff0000);
    this.drawRect(0, 0, this.#width, this.#height);
    this.endFill();
  }

  /*
   * ************************************************************
   *                                                            *
   *                       PUBLIC METHODS                       *
   *                                                            *
   * ************************************************************
   */
  updateHealth(value: number) {
    this.clear();
    this.beginFill(0x000000);
    this.drawRect(0, 0, this.#width, this.#height);
    this.endFill();
    this.beginFill(0xff0000);
    this.drawRect(0, 0, value, this.#height);
    this.endFill();
  }
}
