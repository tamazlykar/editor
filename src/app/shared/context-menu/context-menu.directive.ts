import { Directive, Input, HostListener } from '@angular/core';
import { ContextMenuService } from './context-menu.service';

@Directive({
  selector: '[context-menu]',
})
export class ContextMenuDirective {
  @Input('context-menu') links;

  constructor(private contextMenuService: ContextMenuService) { }

  @HostListener('contextmenu') rightClicked(event: MouseEvent) {
    this.contextMenuService.show.next({event: event, obj: this.links});
    event.preventDefault();
  }
}
