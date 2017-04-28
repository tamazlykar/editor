import { AttributeModel } from './attribute';

export class ClassModel {
  visibility: any;
  name: string;
  attributes: Array<AttributeModel>;

  isAbstract: boolean;
  comment:

  constructor(name: string) {
    this.attributes = new Array<AttributeModel>();

    this.name = name;
  }
}
