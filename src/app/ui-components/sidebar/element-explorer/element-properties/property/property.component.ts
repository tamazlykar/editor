import { Component } from '@angular/core';
import { ObjectModelService } from '../../../../../shared/services/model-services';
import { PropertyModel, Visibility } from '../../../../../shared/data-model';

@Component({
  selector: 'uml-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  public unchangedModel: PropertyModel;
  public model: PropertyModel;
  public visibilityElements = Visibility.elements;

  constructor(private modelService: ObjectModelService) {
    this.modelService.getSelectedModel().subscribe(model => {
      if (model.elementType === 'Property') {
        this.unchangedModel = model as PropertyModel;
        this.model = Object.assign({}, model) as PropertyModel;
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
