import { ObjectModel } from './object.model';
import { IComment } from './metamodel';

export class CommentModel extends ObjectModel implements IComment {
  body: string;
  annotatedElementsIds: Array<string>;

  constructor(body: string = null) {
    super('Comment');
    this.annotatedElementsIds = new Array<string>();

    this.body = body;
  }
}
