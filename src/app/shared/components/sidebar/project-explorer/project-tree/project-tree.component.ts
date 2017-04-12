import { Component, OnInit } from '@angular/core';
import { ProjectService, DiagramService } from '../../../../services';
import { Observable } from 'rxjs/Observable';
import { Project, Diagram } from '../../../../interfaces';

@Component({
  selector: 'uml-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css']
})
export class ProjectTreeComponent implements OnInit {
  private project: Observable<Project>;
  private diagrams: Observable<Diagram[]>;

  constructor(
    private projectService: ProjectService,
    private diagramService: DiagramService
  ) {}

  public ngOnInit() {
    this.project = this.projectService.currentProject;
    this.diagrams = this.diagramService.diagrams;
  }

  private onDiagramSelect(diagram: Diagram) {
    this.diagramService.set(diagram.$key);
  }
}
