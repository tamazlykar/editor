import { ElementModel } from '../element';
import { IParameter, VisibilityKind } from '../../metamodel';
import { OperationModel } from './operation';
import { ClassifierModel } from '../classifiers';

export class ParameterModel extends ElementModel implements IParameter {
  public visibility: VisibilityKind;
  public name: string;
  public typeKey: string;
  public operation: OperationModel;
}
