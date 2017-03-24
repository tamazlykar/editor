import {ElementVisitor} from "../element-visitor";
import {RaphaelText} from "./raphael-text";
import {Params} from "../types";
import {RaphaelRectangle} from "./raphael-rectangle";
import {RaphaelLine} from "./raphael-line";

export class RaphaelDataVisitor extends ElementVisitor {
  public visitText(element: RaphaelText, params?: Params) {
    if (!params || !params['key']) {
      return;
    }
    element.data(params['key'], params['value']);
  }

  public visitRectangle(element: RaphaelRectangle, params?: Params) {

  }

  public visitLine(element: RaphaelLine, params?: Params) {

  }
}


export class RaphaelDrag extends ElementVisitor {
  public visitText(element: RaphaelText, params?: Params) {
    if (!params) {
      return;
    }
    element.data(params['key'], params['value']);
  }

  public visitRectangle(element: RaphaelRectangle, params?: Params) {

  }

  public visitLine(element: RaphaelLine, params?: Params) {

  }
}
