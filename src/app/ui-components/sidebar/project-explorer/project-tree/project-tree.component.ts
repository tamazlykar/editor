import { Component, OnInit } from '@angular/core';
import { ProjectService, DiagramService } from '../../../../shared/services/model-services';
import { Observable } from 'rxjs/Observable';
import { ProjectModel, DiagramModel } from '../../../../shared/data-model';

@Component({
  selector: 'uml-project-tree',
  templateUrl: 'project-tree.component.html',
  styleUrls: ['project-tree.component.css']
})
export class ProjectTreeComponent implements OnInit {
  private project: Observable<ProjectModel>;
  private diagrams: Observable<DiagramModel[]>;

  constructor(
    private projectService: ProjectService,
    private diagramService: DiagramService
  ) {}

  public ngOnInit() {
    this.project = this.projectService.currentProject$;
    this.diagrams = this.diagramService.diagrams$;
  }

  public onDiagramSelect(diagram: DiagramModel) {
    this.diagramService.setCurrent(diagram.$key);
  }
}
