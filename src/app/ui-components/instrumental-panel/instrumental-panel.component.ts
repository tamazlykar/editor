import { Component } from '@angular/core';
import { ViewModelDataService, ObjectModelDataService} from '../../shared/services/data-services';
import { ElementNameService } from '../../shared/services/element-service';
import { EventManagerService } from '../../shared/event-manager';
import { ClassModel, ElementType, CommentModel } from '../../shared/data-model/object-model';
import { ClassView, InterfaceView, CommentView } from '../../shared/data-model/view-model';

@Component({
    selector: 'uml-instrumental-panel',
    templateUrl: 'instrumental-panel.component.html',
    styleUrls: ['./instrumental-panel.component.css']
})
export class InstrumentalPanelComponent {
  constructor(
    private modelService: ObjectModelDataService,
    private viewService: ViewModelDataService,
    private eventManager: EventManagerService
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
  }

  public onMouseDown(e, data) {
    console.log('InstrumentPanel: mousedown');
    // this.dragService.drag(e, data);
  }


  public createElement(e: MouseEvent, type: ElementType) {
    this.eventManager.setAddNewElementState(e, type);
  }
}
