import { Component } from '@angular/core';
import { ViewModelDataService, ObjectModelDataService} from '../../shared/services/data-services';
import { DragManagerService } from '../../shared/services/drag-manager-service';
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
    private viewService: ViewModelDataService,
    private dragService: DragManagerService
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

  public onMouseDown(e, data) {
    console.log('InstrumentPanel: mousedown');
    this.dragService.drag(e, data);
  }
}
