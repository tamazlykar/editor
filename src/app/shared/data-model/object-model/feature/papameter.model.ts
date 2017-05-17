import { IParameter, VisibilityKind } from '../metamodel';

export class ParameterModel implements IParameter {
  name: string;
  visibility: VisibilityKind;
  typeId: string;
  typeName: string;
  commentIds: Array<string>;

  public static toString(model: ParameterModel) {
    return `${model.name}: ${model.typeName}`;
  }

  constructor(name: string, typeName: string, typeId?: string) {
    this.name = name;
    this.typeName = typeName;
    this.typeId = typeId;
    this.visibility = VisibilityKind.public;
    this.commentIds = [];
  }
}
