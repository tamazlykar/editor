import { Injectable } from '@angular/core';
import { ExportService } from './export-service';
import { DiagramControllerService } from '../diagram-controller';

declare class RaphaelPaper {
  toSVG()
}

@Injectable()
export class RaphaelExportService extends ExportService {

  constructor(protected diagramService: DiagramControllerService) {
    super(diagramService);
  }

  protected getSvg() {
    const paper: RaphaelPaper = this.diagramService.graphics.factory.paper;
    return paper.toSVG();
  }
}
