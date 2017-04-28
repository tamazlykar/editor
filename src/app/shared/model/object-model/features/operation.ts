import { ElementModel } from '../element';
import { IOperation, VisibilityKind } from '../../metamodel';
import { ClassifierModel } from '../classifiers';
import { ParameterModel } from './parameter';

export class OperationModel extends ElementModel implements IOperation {
  public visibility: VisibilityKind;
  public name: string;
  public parameters: Array<ParameterModel>;
  public typeKey: string;
  public isAbstract: boolean;
  public isStatic: boolean;
  public isLeaf: boolean;
}
