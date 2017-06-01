import { IDependency } from '../metamodel';
import { ObjectModel } from '../object.model';

export class DependencyModel extends ObjectModel implements IDependency {
  supplierKey: string;
  clientKey: string;
  commentIds: Array<string>;
}
