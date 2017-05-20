import { Injectable } from '@angular/core';

@Injectable()
export class DragManagerService {
  private isDragging = false;
  private dragData: DragData;
  private startDragX: number;
  private startDragY: number;
  private dragAvatar: HTMLElement;

  private onmousemove = (e: MouseEvent) => {
    if (!this.dragData) {
      return;
    }

    if (!this.dragAvatar) {
      // посчитать дистанцию, на которую переместился курсор мыши
      const moveX = e.pageX - this.startDragX;
      const moveY = e.pageY - this.startDragY;
      if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
        return; // ничего не делать, мышь не передвинулась достаточно далеко
      }

      this.dragAvatar = document.createElement('div');
      this.dragAvatar.innerHTML = '<strong>Ура!</strong> Вы прочитали это важное сообщение.';
      document.body.appendChild(this.dragAvatar);
      this.dragAvatar.style.zIndex = '9999';
      this.dragAvatar.style.position = 'absolute';
    }

    this.dragAvatar.style.left = e.pageX - this.startDragX + 'px';
    this.dragAvatar.style.top = e.pageY - this.startDragY + 'px';

    return false;
  };

  constructor() {
    document.addEventListener('mouseup', () => {
      if (this.dragAvatar) {
        document.body.removeChild(this.dragAvatar);

        this.dragData = null;
      }


      this.dragAvatar = null;
    });
    document.addEventListener('mousemove', this.onmousemove);
  }

  public drag(e: MouseEvent, payload: any) {
    this.isDragging = true;
    this.dragData = payload;
    this.startDragX = e.pageX;
    this.startDragY = e.pageY;
  }

  public handle() {

  }
}

interface DragData {
  a: number;
}
