export abstract class Element {
  id: string;
  abstract type: string;

  constructor() {
    this.id = Math.random().toString();
  }
}
