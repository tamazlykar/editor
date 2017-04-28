import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uml-svg-main',
  template: `
  <svg>
    <svg:g *ngFor="let ass of arr" uml-inner-svg  [xn]="ass"/>
  </svg>
  `
})
export class SvgMainComponent implements OnInit {
  arr = [100, 50];
  constructor() {
  }

  ngOnInit() { }
}
