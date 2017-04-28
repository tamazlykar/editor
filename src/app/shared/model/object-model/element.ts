import { IElement } from '../metamodel';
import { Firebase } from '../firebase';

export abstract class ElementModel implements IElement, Firebase {
  public $key: string;
  public commentKeys: Array<string>;
}
