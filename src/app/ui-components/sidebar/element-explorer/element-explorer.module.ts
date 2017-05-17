import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { ElementExplorerComponent } from './element-explorer.component';
import { DynamicComponent } from './dynamic-component/dynamic-component';
import { CommentComponent } from './element-properties';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      MaterialModule
    ],
    exports: [
      ElementExplorerComponent
    ],
    declarations: [
      ElementExplorerComponent,
      DynamicComponent,
      CommentComponent
    ],
    providers: [],
})
export class ElementExplorerModule { }
