import { ClassifierModel } from './classifier';
import { IClass } from '../../metamodel';
import { PropertyModel, OperationModel } from '../features';

export class ClassModel extends ClassifierModel implements IClass {
  public attributes: Array<PropertyModel>;
  public operations: Array<OperationModel>;
}
