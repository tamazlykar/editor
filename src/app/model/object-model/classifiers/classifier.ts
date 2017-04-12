import { Element } from '../element';
import { IClassifier } from '../../metamodel';

export abstract class Classifier extends Element implements IClassifier {
  public isAbstract: any;
  public name: string;
  public visibility: any;
  public supplierDependencies: any;
  public clientDependencies: any;
  public comment: any;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
