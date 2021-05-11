import { Component, OnInit } from '@angular/core';
declare var activee:any;
// Declaro las variables de jQuery
declare var jQuery:any;
declare var $:any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-casa',
  templateUrl: './listado-casa.component.html',
  styleUrls: ['./listado-casa.component.css']
})
export class ListadoCasaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    activee($);
  }

}
