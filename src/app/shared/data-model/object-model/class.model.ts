import { ObjectModel } from './object.model';
import { PropertyModel } from './feature';
import { IClass, VisibilityKind } from './metamodel';

export class ClassModel extends ObjectModel implements IClass {
  visibility: VisibilityKind;
  isAbstract: boolean;
  name: string;
  attributes: Array<PropertyModel>;
  operations: Array<any>;
  supplierDependenciesIds: Array<string>;
  clientDependenciesIds: Array<string>;
  commentIds: Array<string>;

  viewModelIds: Array<string>;

  constructor(name: string) {
    super('Class');
    this.attributes = new Array<any>();
    this.operations = new Array<any>();
    this.supplierDependenciesIds = new Array<string>();
    this.clientDependenciesIds = new Array<string>();
    this.commentIds = new Array<string>();

    this.name = name;
    this.isAbstract = false;
    this.visibility = VisibilityKind.public;
  }
}
