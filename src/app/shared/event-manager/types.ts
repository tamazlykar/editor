export type EventType
  = 'dragging-element'
  | 'adding-new-element'
  | 'adding-existing-element';


export const EventType = {
  draggingElement: 'dragging-element' as EventType,
  addingNewElement: 'adding-new-element' as EventType,
  addingExistingElement: 'adding-existing-element' as EventType
}

export interface EventInfo {
  type: EventType;
  data: any;
  avatar?: any;
  startX: number;
  startY: number;
  shiftX?: number;
  shiftY?: number;
}


