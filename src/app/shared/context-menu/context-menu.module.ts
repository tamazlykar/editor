import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { ContextMenuHolderComponent } from './context-menu-holder.component';
import { ContextMenuDirective } from './context-menu.directive';


@NgModule({
    imports: [
      BrowserModule,
      MaterialModule
    ],
    exports: [
      ContextMenuHolderComponent
    ],
    declarations: [
      ContextMenuHolderComponent,
      ContextMenuDirective
    ],
    providers: [],
})
export class ContextMenuModule { }

