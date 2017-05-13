export class ResizableRect {
  private static rect: RaphaelSet = null;

  public static set(rect: RaphaelSet) {
    ResizableRect.remove();
    this.rect = rect;
  }

  public static get(): RaphaelSet {
    return this.rect;
  }

  public static remove() {
   if (this.rect) {
     this.rect.remove();
   }
   this.rect = null;
  }
}
