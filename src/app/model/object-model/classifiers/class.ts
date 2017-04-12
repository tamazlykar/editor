import { Classifier } from './classifier';
import { IClass } from '../../metamodel';

export class Class extends Classifier implements IClass {
  public type: string;
  public attributes: any;
  public operations: any;

  constructor(name: string) {
    super(name);
    this.type = 'Class';
  }
}
