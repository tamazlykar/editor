import { IGeneralization } from '../metamodel';
import { ObjectModel } from '../object.model';

export class DependencyModel extends ObjectModel implements IGeneralization {
  specificKey: string;
  generalKey: string;
  commentIds: Array<string>;
}
