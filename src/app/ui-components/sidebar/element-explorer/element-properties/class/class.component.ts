import { Component } from '@angular/core';
import { ObjectModelService } from '../../../../../shared/services/model-services';
import { ClassModel, Visibility } from '../../../../../shared/data-model';

@Component({
  selector: 'uml-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  public unchangedModel: ClassModel;
  public model: ClassModel;
  public visibilityElements = Visibility.elements;

  constructor(private modelService: ObjectModelService) {
    this.modelService.getSelectedModel().subscribe(model => {
      if (model.elementType === 'Class') {
        this.unchangedModel = model as ClassModel;
        this.model = Object.assign({}, model) as ClassModel;
      }
    });
  }

  public update() {
    this.modelService.update(this.model.$key, this.model);
  }

  public onNameChanged(value: string) {
    if (this.unchangedModel.name === value) {
      return;
    }
    this.model.name = value;
    this.update();
  }

  public onVisibilityChanged() {
    this.update();
  }

  public onAbstractChanged() {
    this.update();
  }
}
