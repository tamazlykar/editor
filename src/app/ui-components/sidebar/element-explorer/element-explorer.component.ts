import { Component } from '@angular/core';
import { ObjectModelService, ViewModelService } from '../../../shared/services/model-services';
import { ObjectModel } from '../../../shared/data-model/object-model';
import { ViewModel } from '../../../shared/data-model/view-model';
import {
  CommentComponent,
  ClassComponent,
  StubComponent,
  PropertyComponent,
  OperationComponent
} from './element-properties';

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
    this.modelService.getSelectedModel().subscribe(model => {
      console.log('m', model);
      this.onModelChange(model);
    });
  }

  private onModelChange(model: ObjectModel) {
    if (!model) {
      this.componentData = {
        component: StubComponent,
        inputs: {}
      };
      return;
    }

    switch (model.elementType) {
      case 'Class': {
        this.componentData = {
          component: ClassComponent,
          inputs: {}
        };
        break;
      }
      case 'Property': {
        this.componentData = {
          component: PropertyComponent,
          inputs: {}
        };
        break;
      }
      case 'Operation': {
        this.componentData = {
          component: OperationComponent,
          inputs: {}
        };
        break;
      }
      case 'Comment': {
        this.componentData = {
          component: CommentComponent,
          inputs: {}
        };
        break;
      }
      default: {
        this.componentData = {
          component: StubComponent,
          inputs: {}
        };
        break;
      }
    }
  };
}
