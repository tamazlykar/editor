import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ObjectModelService } from '../../../../../shared/services/model-services';
import { CommentModel, CommentView } from '../../../../../shared/data-model';

@Component({
  selector: 'uml-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  public unchangedModel: CommentModel;
  public model: CommentModel;


  @ViewChild('autosize') autosize;

  constructor(private modelService: ObjectModelService) {
    this.modelService.getSelectedModel().subscribe(model => {
      if (model.elementType === 'Comment') {
        this.unchangedModel = model as CommentModel;
        this.model = Object.assign({}, model) as CommentModel;
      }
    });
  }

  ngAfterViewInit() {
    this.autosize.resizeToFitContent();
  }

  public update() {
    this.modelService.update(this.model.$key, this.model);
  }

  public onTextChanged(value: string) {
    if (this.unchangedModel.body === value) {
      return;
    }
    this.model.body = value;
    this.update();
  }
}
