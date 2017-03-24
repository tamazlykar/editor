import { Component, AfterViewInit } from '@angular/core';
import {Graphics} from "../graphics/graphics";

@Component({
  selector: 'app-develop-view',
  templateUrl: './develop-view.component.html',
  styleUrls: ['./develop-view.component.css']
})
export class DevelopViewComponent implements AfterViewInit {

  constructor() { }

  private g: Graphics;

  public ngAfterViewInit(): void {
    const element = document.getElementById('canvas');
    this.g = new Graphics(element, 300, 300);
    this.testing();
  }

  private testing() {
    let text = this.g.text(50, 50, "Hello world!");
    let text2 = this.g.text(100, 100, 'Hello man');
    let set = this.g.set();
    set.add(text);
    set.add(text2);
    set.draggable(true);
  }
}
