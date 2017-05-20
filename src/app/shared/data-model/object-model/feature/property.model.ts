import { ObjectModel } from '../object.model';
import { IProperty, AggregationKind, VisibilityKind } from '../metamodel';
import { generatePushID } from '../../../id-generator';

export class PropertyModel extends ObjectModel implements IProperty {
  id: string;
  name: string;
  visibility: VisibilityKind;
  typeId: string;
  typeName: string;
  aggregation: AggregationKind;
  isStatic: boolean;
  isLeaf: boolean;
  commentIds: Array<string>;

  public static toString(model: PropertyModel) {
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
      default: {
        v = ' ';
        break;
      }
    }

    let type = '';
    if (model.typeName) {
      type = `: ${model.typeName}`;
    }

    return `${v}${model.name}${type}`;
  }

  constructor(name: string) {
    super('Property');
    this.id = generatePushID();
    this.name = name;
    this.visibility = VisibilityKind.public;
    this.typeId = null;
    this.typeName = null;
    this.aggregation = AggregationKind.none;
    this.isStatic = false;
    this.isLeaf = false;
    this.commentIds = [];
  }
}
