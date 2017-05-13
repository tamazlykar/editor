import { FirebaseObject } from './firebase-object';

export class DiagramModel extends FirebaseObject {
  public name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
