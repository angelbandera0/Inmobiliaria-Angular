import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css'],
})
export class Error403Component implements OnInit {
  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }
  ngOnInit(): void {}
}
