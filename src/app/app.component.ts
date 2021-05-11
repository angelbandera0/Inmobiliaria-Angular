import { Component } from '@angular/core';
declare var activee:any;
// Declaro las variables de jQuery
declare var jQuery:any;
declare var $:any;
declare var myExtObject: any;
declare var webGlObject: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'green-world-front-end';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

constructor(){
    //webGlObject.init();
}

}
