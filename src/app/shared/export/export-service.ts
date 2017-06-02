import { Injectable } from '@angular/core';
import { ExportType } from './type';
import { DiagramControllerService } from '../diagram-controller';

declare function canvg(canvas: any, svg: any);

@Injectable()
export abstract class ExportService {

  constructor(protected diagramService: DiagramControllerService) { }

  public export(type: ExportType) {
    const svg = this.getSvg();

    switch (type) {
      case ExportType.svg: {
        this.exportSvg(svg);
        break;
      }
      case ExportType.png: {
        this.exportPng(svg);
      }
    }
  }


  private exportSvg(svg: any) {
    const a = document.createElement('a');
    a.download = 'mySvg.svg';
    a.type = 'image/svg+xml';
    const blob = new Blob([svg], {'type': 'image/svg+xml'});
    a.href = window.URL.createObjectURL(blob);
    a.click();
  }

  private exportPng(svg: any) {
    const canvas = document.createElement('canvas');
    canvg(canvas, svg);

    setTimeout(function() {
      const dataURL = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = dataURL;
      document.body.appendChild(link);
      link.click();
      setTimeout( function () {
        link.parentNode.removeChild( link );
      }, 10);
    }, 100);
  }

  protected abstract getSvg();
}
