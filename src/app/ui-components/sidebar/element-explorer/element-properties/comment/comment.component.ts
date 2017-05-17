import { Component, Injector } from '@angular/core';
import { CommentModel, CommentView } from '../../../../../shared/data-model';

@Component({
  selector: 'uml-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent {
  public model: CommentModel;
  public view: CommentView;

  constructor(private injector: Injector) {
    // this.element = this.injector.get('element');
    // this.model = this.element.getModel();
    // console.log(this.model.isAbstract);
  }

  public update() {
    // this.element.draw();
    // console.log(this.model.isAbstract);
  }
}
