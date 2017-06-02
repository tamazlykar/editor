import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ExportDialogComponent } from '../export-dialog';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/redux/actions/ui';
import { State } from '../../shared/redux/reducers';
import { ExportService } from '../../shared/export';


@Component({
    selector: 'uml-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})
export class SidenavComponent {
  constructor(
    private store: Store<State>,
    public dialog: MdDialog,
    public exportService: ExportService
  ) {}

  public openExportDialog() {
    this.store.dispatch(new ui.CloseSidenavAction());
    const dialogRef = this.dialog.open(ExportDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.exportService.export(result);
    });
  }

}
