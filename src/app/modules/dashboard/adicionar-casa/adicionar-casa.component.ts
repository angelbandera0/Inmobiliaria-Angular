import { Provincia, ProvinciaM } from './../../../models/provincia.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-adicionar-casa',
  templateUrl: './adicionar-casa.component.html',
  styleUrls: ['./adicionar-casa.component.css'],
})
export class AdicionarCasaComponent implements OnInit {
  provincia: Provincia;
  listadoProvincias: ProvinciaM[];
  listadoMunicipios: string[] = [];
  currentP: string = 'Provincia';
  currentM: string = 'Municipio';

  constructor() {
    this.provincia = new Provincia();
    this.listadoProvincias = this.provincia.listadoProvincias;
  }

  ngOnInit(): void {
    activee($);
    //(document.querySelector('.nice-select') as HTMLElement).style.width ='100% !important';
    $('.nice-select').attr('style', 'width: 100% !important');
    $('.list').attr('style', 'width: 100% !important');
    console.log(this.listadoProvincias);
  }

  ngAfterViewInit() {
    //this.prov.nativeElement.insertAdjacentHTML('beforeend', '<option values="" _ngcontent-rig-c110="">two</option>');
  }
  onselectProvincia(e: any, id: any) {
    console.log(e);
    console.log(id);
    this.currentP = this.listadoProvincias[id - 1].nombre;
    this.currentM = this.listadoProvincias[id - 1].municipios[0];
    console.log(this.currentM);
    this.listadoMunicipios = this.listadoProvincias[id - 1].municipios;
    console.log(this.listadoMunicipios);
  }
  onselectMunicipio(e: any, nombre: string) {
    console.log(this.currentM+"1");

    this.currentM = nombre;
  }
}
