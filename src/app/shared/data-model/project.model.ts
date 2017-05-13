import { FirebaseObject } from './firebase-object';

export class ProjectModel extends FirebaseObject {
  public name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
