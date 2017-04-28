import { IComment } from '../metamodel';

export class CommentModel implements IComment {
  public body: string;
  public annotatedElementsKeys: Array<string>;

  constructor() {
    this.annotatedElementsKeys = new Array<string>();
  }
}
