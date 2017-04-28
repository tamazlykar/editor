import { IClass } from '../../../model/metamodel';

export class Class implements IClass {
  public name: string;
  public visibility: VisibilityKind;
  public isAbstract: boolean;
  public supplierDependencies: Array<UMLDependency>;
  public clientDependencies: Array<UMLDependency>;
  public attributes: Array<UMLProperty>;
  public operations: Array<UMLOperation>;
  public comment: Array<any>;
}
