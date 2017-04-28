import { ElementModel } from '../element';
import { ClassifierModel } from '../classifiers';
import { IDependency } from '../../metamodel';

export class DependencyModel extends ElementModel implements IDependency {
  public supplier: ClassifierModel;
  public client: ClassifierModel;
}
