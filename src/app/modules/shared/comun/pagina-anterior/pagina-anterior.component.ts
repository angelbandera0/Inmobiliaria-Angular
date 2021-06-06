import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-anterior',
  templateUrl: './pagina-anterior.component.html',
  styleUrls: ['./pagina-anterior.component.css']
})
export class PaginaAnteriorComponent implements OnInit {

  constructor(private location: Location) {}

  back(): void {
    this.location.back();
  }
  ngOnInit(): void {
  }

}
