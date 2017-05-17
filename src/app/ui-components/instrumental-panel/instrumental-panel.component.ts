import { Component } from '@angular/core';
import { ViewModelDataService, ObjectModelDataService} from '../../shared/services/data-services';
import { ClassModel, InterfaceModel, CommentModel } from '../../shared/data-model/object-model';
import { ClassView, InterfaceView, CommentView } from '../../shared/data-model/view-model';

@Component({
    selector: 'uml-instrumental-panel',
    templateUrl: 'instrumental-panel.component.html',
    styleUrls: ['instrumental-panel.component.css']
})
export class InstrumentalPanelComponent {
  constructor(
    private modelService: ObjectModelDataService,
    private viewService: ViewModelDataService
  ) { }

  public createClass() {
    const model = new ClassModel('ClassName'); // TODO
    this.modelService.add(model)
      .then(id => {
        const view = new ClassView(id, 50, 50);
        this.viewService.add(view);
      });
  }

  public createCommnet() {
    const model = new CommentModel('Hi'); // TODO
    this.modelService.add(model)
      .then(id => {
        const view = new CommentView(id, 50, 50);
        this.viewService.add(view);
      });
  }
}
