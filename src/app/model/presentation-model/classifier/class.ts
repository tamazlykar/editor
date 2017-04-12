import { Element } from '../element';

export class Class extends Element {
  readonly type: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor() {
    super();
    this.type = 'Class';

    this.testing();
  }

  testing() {
    this.x = 60;
    this.y = 60;
    this.width = 60;
    this.height = 30;
  }
}
