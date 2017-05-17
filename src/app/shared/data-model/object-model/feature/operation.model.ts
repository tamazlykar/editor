import { IOperation, VisibilityKind } from '../metamodel';
import { generatePushID } from '../../../id-generator';
import { ParameterModel } from './papameter.model';

export class OperationModel implements IOperation {
  id: string;
  name: string;
  visibility: VisibilityKind;
  typeId: string;
  typeName: string;
  isStatic: boolean;
  isLeaf: boolean;
  commentIds: Array<string>;
  parameters: Array<ParameterModel>;
  isAbstract: boolean;

  public static toString(model: OperationModel) {
    let v: string;
    switch (model.visibility) {
      case VisibilityKind.public: {
        v = '+';
        break;
      }
      case VisibilityKind.private: {
        v = '-';
        break;
      }
      case VisibilityKind.protected: {
        v = '#';
        break;
      }
    }

    let params = '';
    if (model.parameters) {
      params = ParameterModel.toString(model.parameters[0]);

      for (let i = 1; i < model.parameters.length; i++) {
        params += ', ' + ParameterModel.toString(model.parameters[i]);
      }
    }

    let type = '';
    if (model.typeName) {
      type = `: ${model.typeName}`;
    }

    return `${v}${model.name}(${params})${type}`;
  }

  constructor(name: string) {
    this.id = generatePushID();
    this.name = name;
    this.visibility = VisibilityKind.public;
    this.typeId = null;
    this.typeName = null;
    this.isStatic = false;
    this.isLeaf = false;
    this.commentIds = [];
    this.parameters = [];
    this.isAbstract = false;
  }
}
