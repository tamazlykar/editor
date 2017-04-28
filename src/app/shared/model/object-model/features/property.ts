import { ElementModel } from '../element';
import { IProperty, AggregationKind, VisibilityKind } from '../../metamodel';
import { ClassifierModel } from '../classifiers';

export class PropertyModel extends ElementModel implements IProperty {
  public visibility: VisibilityKind;
  public name: string;
  public typeKey: string;
  public aggregation: AggregationKind;
  public isStatic: boolean;
  public isLeaf: boolean;


  // public getTextRepresentation(): string {
  //   let v: string;
  //   switch (this.visibility) {
  //     case VisibilityKind.public:
  //       v = '+';
  //       break;
  //     case VisibilityKind.private:
  //       v = '-';
  //       break;
  //     case VisibilityKind.protected:
  //       v = '#';
  //       break;
  //     default:
  //       console.log('Unknown type of visibility on property');
  //   }
  //
  //   let type = '';
  //   if (this.type) {
  //     type  = `: ${this.type.name}`;
  //   }
  //   return `${v}${this.name}${type}`;
  // }
}
