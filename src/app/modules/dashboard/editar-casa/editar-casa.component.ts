import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-casa',
  templateUrl: './editar-casa.component.html',
  styleUrls: ['./editar-casa.component.css']
})
export class EditarCasaComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}



  ngOnInit(): void {
  }

}
