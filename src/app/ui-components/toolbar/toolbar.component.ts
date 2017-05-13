import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../shared/redux/reducers';
import * as ui from '../../shared/redux/actions/ui';

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
