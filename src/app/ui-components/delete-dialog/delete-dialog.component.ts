import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'uml-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MdDialogRef<DeleteDialogComponent>) {}
}
