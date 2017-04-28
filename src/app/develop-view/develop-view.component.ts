import { Component, AfterViewInit } from '@angular/core';
import { DiagramController } from '../diagram-controller/diagram-controller';
import { Graphics } from '../graphics/graphics';
import { DiagramService, AuthService } from '../shared/services';
import { Diagram } from '../shared/interfaces';


@Component({
  selector: 'uml-develop-view',
  templateUrl: './develop-view.component.html',
  styleUrls: ['./develop-view.component.css']
})
export class DevelopViewComponent implements AfterViewInit {
  private g: Graphics;

  constructor(private authService: AuthService, private diagramService: DiagramService) {
    this.test();
  }

  public test() {
  }

  public ngAfterViewInit(): void {
    const element = document.getElementById('canvas');
    this.g = new Graphics(element, 800, 600);
    this.testing();
  }

  private testing() {
    let text = this.g.text(50, 50, "Hello world!");
    let text2 = this.g.text(100, 100, 'Hello man');
    let set1 = this.g.set();
    set1.add(text);
    set1.add(text2);
    set1.draggable();

    let rect = this.g.rect(300, 300, 100, 200);
    let text3 = this.g.text(350, 350, 'ClassName');
    let line = this.g.line(600, 200, 800, 200);
    console.log('Line x1', line.x1);
    console.log('Line', line);
    let set2 = this.g.set();
    set2.add(rect);
    set2.add(text3);
    set2.add(line);
    set2.draggable();

    //let line = this.g.line(600, 200, 800, 200);
    // let set3 = this.g.set();
    // set3.add(line);
    // set3.draggable(true);
  }
}
