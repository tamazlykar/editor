import { FirebaseObject } from '../firebase-object';

export class ViewModel extends FirebaseObject {
  modelId: string;

  constructor(modelId: string) {
    super();
    this.modelId = modelId;
  }
}
