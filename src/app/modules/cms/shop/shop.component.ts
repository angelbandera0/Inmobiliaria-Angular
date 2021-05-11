import { Component, OnInit } from '@angular/core';
declare var activee:any;
// Declaro las variables de jQuery
declare var jQuery:any;
declare var $:any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    activee($);
    jQuery(function() {
      //alert('Hello, custom js');
    });

  }

}
