import { Component } from '@angular/core';
import { ObjectModelService } from '../../../../shared/services/model-services';
import { Observable } from 'rxjs/Observable';
import {
  ObjectModel,
  ClassModel,
  CommentModel,
  ElementType
} from '../../../../shared/data-model/object-model';

@Component({
    selector: 'uml-project-model',
    templateUrl: './project-model.component.html',
    styleUrls: ['./project-model.component.css']
})
export class ProjectModelComponent {
  private elements$: Observable<Array<ObjectModel>>;
  private classes: Array<ClassModel>;
  private comments: Array<CommentModel>;

  constructor(
    private modelService: ObjectModelService
  ) {
    this.elements$ = modelService.getElements();
    this.elements$.subscribe(elements => {
      this.classes = elements.filter(el => el.elementType === ElementType.class) as Array<ClassModel>;
      this.comments = elements.filter(el => el.elementType === ElementType.comment) as Array<CommentModel>;
    });
  }
}
