import { FirebaseObject } from '../firebase-object';

export class ObjectModel extends FirebaseObject {
  elementType: string;
  constructor(elementType: string) {
    super();
    this.elementType = elementType;
  }
}
