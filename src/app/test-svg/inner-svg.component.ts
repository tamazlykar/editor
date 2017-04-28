import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[uml-inner-svg]',
  template: `
    <svg:text x="150" [attr.y]="xn" (click)="ad()">Hello world from Ng2!</svg:text>
  `
})
export class InnerSvgComponent implements OnInit {
  @Input() xn: number;
  constructor() {

  }

  ngOnInit() {
    console.log(this.xn);
  }

  ad() {
    console.log('click');
  }
}
