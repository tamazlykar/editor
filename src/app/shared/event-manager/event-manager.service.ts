import { Injectable } from '@angular/core';
import { EventType, EventInfo } from './types';
import { ElementService } from '../services/element-service';
import { ElementType } from '../data-model';
import {
  ObjectModel,
  ClassModel
} from '../data-model/object-model';
import {
  ViewModel,
  InterfaceView
} from '../data-model/view-model';

@Injectable()
export class EventManagerService {
  private eventInfo: EventInfo;
  private dragAvatar: any;

  private onmousemove = (e: MouseEvent) => {
    if (!this.eventInfo) {
      return;
    }

    if (!this.dragAvatar) {
      // посчитать дистанцию, на которую переместился курсор мыши
      const moveX = e.pageX - this.eventInfo.startX;
      const moveY = e.pageY - this.eventInfo.startY;
      if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
        return; // ничего не делать, мышь не передвинулась достаточно далеко
      }


      this.dragAvatar = document.createElement('div');
      this.dragAvatar.innerHTML = '<strong>Добавление</strong>';

      let coords = this.getCoords(this.dragAvatar);
      this.eventInfo.shiftX = this.eventInfo.startX - coords.left;
      this.eventInfo.shiftY = this.eventInfo.startY - coords.top;

      document.body.appendChild(this.dragAvatar);
      this.dragAvatar.style.zIndex = '9999';
      this.dragAvatar.style.position = 'absolute';


    }

    this.dragAvatar.style.left = (e.pageX + 10) +  'px';
    this.dragAvatar.style.top = (e.pageY + 10) + 'px';

    return false;
  };

  constructor(
    private elementService: ElementService
  ) {
    this.eventInfo = null;
    document.addEventListener('mousedown', (e) => e.preventDefault());
    document.addEventListener('mousemove', this.onmousemove);
    document.addEventListener('mouseup', () => {
      if (this.dragAvatar) {
        document.body.removeChild(this.dragAvatar);
        this.dragAvatar = null;
        this.eventInfo = null;
      }
    });
  }

  public setAddNewElementState(e: MouseEvent, type: ElementType) {
    this.eventInfo = {
      type: EventType.addingNewElement,
      data: {
        elementType: type
      },
      startX: e.pageX,
      startY: e.pageY
    };
  }

  public canvasAddNewElement(e: MouseEvent) {
    if (!this.eventInfo) {
      return;
    }
    if (this.eventInfo.type !== EventType.addingNewElement) {
      return;
    }

    const bRect = e.srcElement.getBoundingClientRect();
    const x = e.clientX - bRect.left;
    const y = e.clientY - bRect.top;

    switch (this.eventInfo.data.elementType) {
      case ElementType.class: {
        this.elementService.addClass(x, y);
        break;
      }
      case ElementType.interface: {
        console.log('Add Interface');
        this.elementService.addInterface(x, y);
        break;
      }
      case ElementType.comment: {
        console.log('Add comment');
        this.elementService.addComment(x, y);
        break;
      }
    }

    this.eventInfo = null;
  }

  public elementAddNewSubelement(e: MouseEvent, modelId: string, viewId: string) {
    if (!this.eventInfo) {
      return;
    }
    if (this.eventInfo.type !== EventType.addingNewElement) {
      return
    }

    let model: ObjectModel;
    let view: ViewModel;
    switch (this.eventInfo.data.elementType) {
      case ElementType.property: {
        this.elementService.addAttribute(modelId, viewId);
        break;
      }
      case ElementType.operation: {
        this.elementService.addOperation(modelId, viewId);
        break;
      }
    }

    this.eventInfo = null;
  }

  private getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }
}









// export class EventManagerService {
//   private isDragging = false;
//   private dragData: DragData;
//   private startDragX: number;
//   private startDragY: number;
//   private dragAvatar: HTMLElement;
//
//   private onmousemove = (e: MouseEvent) => {
//     if (!this.dragData) {
//       return;
//     }
//
//     if (!this.dragAvatar) {
//       // посчитать дистанцию, на которую переместился курсор мыши
//       const moveX = e.pageX - this.startDragX;
//       const moveY = e.pageY - this.startDragY;
//       if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
//         return; // ничего не делать, мышь не передвинулась достаточно далеко
//       }
//
//       this.dragAvatar = document.createElement('div');
//       this.dragAvatar.innerHTML = '<strong>Ура!</strong> Вы прочитали это важное сообщение.';
//       document.body.appendChild(this.dragAvatar);
//       this.dragAvatar.style.zIndex = '9999';
//       this.dragAvatar.style.position = 'absolute';
//     }
//
//     this.dragAvatar.style.left = e.pageX - this.startDragX + 'px';
//     this.dragAvatar.style.top = e.pageY - this.startDragY + 'px';
//
//     return false;
//   };
//
//   constructor() {
//     document.addEventListener('mouseup', () => {
//       if (this.dragAvatar) {
//         document.body.removeChild(this.dragAvatar);
//
//         this.dragData = null;
//       }
//
//
//       this.dragAvatar = null;
//     });
//     document.addEventListener('mousemove', this.onmousemove);
//   }
//
//   public drag(e: MouseEvent, payload: any) {
//     this.isDragging = true;
//     this.dragData = payload;
//     this.startDragX = e.pageX;
//     this.startDragY = e.pageY;
//   }
//
//   public handle() {
//
//   }
// }
//
// interface DragData {
//   a: number;
// }
