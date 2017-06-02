import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ExportType } from '../../shared/export';

@Component({
    selector: 'uml-export-dialog',
    templateUrl: './export-dialog.component.html',
    styleUrls: ['./export-dialog.component.css']
})
export class ExportDialogComponent {
  constructor(public dialogRef: MdDialogRef<ExportDialogComponent>) {}

  public svg() {
    this.dialogRef.close(ExportType.svg);
  }

  public png() {
    this.dialogRef.close(ExportType.png);
  }
}
