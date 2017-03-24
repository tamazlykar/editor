export interface RaphaelElements {
  data(key: string, value?: any);
  moveTo(x: number, y: number);
  drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) =>{ },
       onstart: (x: number, y: number, event: DragEvent) =>{ },
       onend: (DragEvent: any) =>{ });
}
