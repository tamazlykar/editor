import { Component } from '@angular/core';
import { ContextMenuService } from './context-menu.service';

@Component({
  selector: 'uml-context-menu-holder',
  templateUrl: './context-menu-holder.component.html',
  styleUrls: ['./context-menu-holder.component.css']
})
export class ContextMenuHolderComponent {
  links = [];
  isShown = false;
  private mouseLocation: {left: number, top: number};

  constructor(private contextMenuService: ContextMenuService) {
    this.mouseLocation = {left: 0, top: 0};

    contextMenuService.show.subscribe(e => this.showMenu(e.event, e.obj));
    document.addEventListener('click', () => this.clickedOutside());
  }


  get locationCss() {
    return {
      'z-index': 9999,
      'position': 'fixed',
      'display': this.isShown ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px'
    };
  }

  clickedOutside() {
    this.isShown = false;
  }

  showMenu(event, links) {
    this.isShown = true;
    this.links = links;
    this.mouseLocation = {
      left: event.clientX,
      top: event.clientY
    };
  }
}
