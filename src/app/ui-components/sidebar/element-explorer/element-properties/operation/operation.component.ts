import { Component } from '@angular/core';
import { ObjectModelService } from '../../../../../shared/services/model-services';
import { OperationModel, Visibility } from '../../../../../shared/data-model';

@Component({
  selector: 'uml-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent {
  public unchangedModel: OperationModel;
  public model: OperationModel;
  public visibilityElements = Visibility.elements;

  constructor(private modelService: ObjectModelService) {
    this.modelService.getSelectedModel().subscribe(model => {
      if (model.elementType === 'Operation') {
        this.unchangedModel = model as OperationModel;
        this.model = Object.assign({}, model) as OperationModel;
      }
    });
  }

  public update() {
    console.log(this.model);
    this.modelService.update(this.model.$key, this.model);
  }

  public onNameChanged(value: string) {
    if (this.unchangedModel.name === value) {
      return;
    }
    this.model.name = value;
    this.update();
  }

  public onTypeChanged(value: string) {
    if (!value || this.unchangedModel.typeName === value) {
      return;
    }
    this.model.typeName = value;
    this.update();
  }

  public onStaticChanged() {
    this.update();
  }
}
