import { Component, AfterViewInit } from '@angular/core';
import { Graphics } from '../../shared/graphics';
import { DiagramControllerService } from '../../shared/diagram-controller';


@Component({
  selector: 'uml-develop-view',
  templateUrl: 'develop-view.component.html',
  styleUrls: ['develop-view.component.css']
})
export class DevelopViewComponent implements AfterViewInit {

  constructor(
    private diagramController: DiagramControllerService
  ) { }

  public ngAfterViewInit(): void {
    const element = document.getElementById('canvas');
    this.diagramController.initialize(element);
  }
}
