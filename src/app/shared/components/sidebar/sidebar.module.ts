import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { SidebarComponent } from './sidebar.component';

import { ElementExplorerComponent } from './element-explorer';

import { ProjectExplorerComponent } from './project-explorer';
import { ProjectTreeComponent } from './project-explorer/project-tree';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent
  ],
  declarations: [
    SidebarComponent,
    ProjectExplorerComponent,
    ElementExplorerComponent,
    ProjectTreeComponent
  ],
  providers: [],
})
export class SidebarModule { }
