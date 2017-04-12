import { Component, ViewChild, OnInit } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State, getSidenavState } from './shared/reducers';
import * as ui from './shared/actions/ui-state';

@Component({
  selector: 'uml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private sidenavOpened$: Observable<boolean>;
  @ViewChild(MdSidenav)
  private mdSidenavComponent: MdSidenav;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.store.select(getSidenavState)
      .subscribe((state: boolean) => {
        if (!state) {
          return;
        }
        this.open();
      });

    this.mdSidenavComponent.onClose
      .subscribe(() => {
        this.store.dispatch(new ui.CloseSidenavAction());
      });
  }

  private open() {
    this.mdSidenavComponent.open();
  }
}
