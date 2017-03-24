import {Text, Rectangle, Line} from "./elements";
import {Params} from "./types";

export abstract class ElementVisitor {
  public abstract visitText(element: Text, params?: Params)
  public abstract visitRectangle(element: Rectangle, params?: Params);
  public abstract visitLine(element: Line, params?: Params);
}
