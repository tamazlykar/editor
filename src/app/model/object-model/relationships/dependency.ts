import { Element } from './';
import { Class } from './class'

export class Dependency extends Element {
  public supplier: Class;
  public client: Class;

  constructor(supplier: Class, client: Class) {
    this.client = client;
    this.supplier = supplier;
  }
}
