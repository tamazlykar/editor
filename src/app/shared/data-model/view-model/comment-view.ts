import { ViewModel } from './view.model';

export class CommentView extends  ViewModel {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(modelId: string, x: number, y: number) {
    super(modelId);
    this.width = 200;
    this.height = 100;

    this.x = x;
    this.y = y;
  }
}
