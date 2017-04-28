import { ElementModel } from '../element';
import { IClassifier, VisibilityKind } from '../../metamodel';

export abstract class ClassifierModel extends ElementModel implements IClassifier {
  public isAbstract: boolean;
  public name: string;
  public visibility: VisibilityKind;
  public supplierDependenciesKeys: Array<string>;
  public clientDependenciesKeys: Array<string>;

  constructor(name: string) {
    super();
    this.name = name;

    this.clientDependenciesKeys = Array<string>();
    this.supplierDependenciesKeys = Array<string>();
  }
}
