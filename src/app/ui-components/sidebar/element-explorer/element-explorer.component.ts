import { Component } from '@angular/core';
import { CommentComponent } from './element-properties';
import { ObjectModelService, ViewModelService } from '../../../shared/services/model-services';

@Component({
    selector: 'uml-element-explorer',
    templateUrl: 'element-explorer.component.html',
    styleUrls: ['element-explorer.component.css']
})

export class ElementExplorerComponent {
  public componentData = null;

  constructor(
    private modelService: ObjectModelService,
    private viewService: ViewModelService
  ) {
    this.viewService.getSelectedView().subscribe(a => console.log('v', a));
    this.modelService.getSelectedModel().subscribe(a => console.log('m', a));
  }
}
