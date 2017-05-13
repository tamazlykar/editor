import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as ui from '../../actions/ui-state';

@Component({
    selector: 'uml-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {
  public appTitle = 'UML Editor';

  constructor(private store: Store<State>) {}

  public openSidebar() {
    this.store.dispatch(new ui.OpenSidenavAction());
  }
}
