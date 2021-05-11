import { Component, OnInit } from '@angular/core';


declare var activee:any;
// Declaro las variables de jQuery
declare var jQuery:any;
declare var $:any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    activee($);
  }

}
