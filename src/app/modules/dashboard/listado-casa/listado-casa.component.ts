import { TiposPropiedades } from 'src/app/enums/tipos-propiedades.enum';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CasaService } from './../../../services/casa.service';
import { Component, OnInit } from '@angular/core';
import { Casa } from 'src/app/models/casa.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Provincia, ProvinciaM } from 'src/app/models/provincia.model';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-casa',
  templateUrl: './listado-casa.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./listado-casa.component.css'],
})
export class ListadoCasaComponent implements OnInit {
  provincia: Provincia;
  listadoProvincias: ProvinciaM[];
  listadoMunicipios: string[] = [];
  tiposPropiedades: string[] = [];
  currentP: string = 'Provincia';
  currentM: string = 'Municipio';
  currentTP: string = 'Tipo de Propiedad';
  listadoCasas!: Casa[];
  user!: User;
  idDelete!: string;
  formData=new FormData();
  obj = {
    localidad: '',
    precio: '',
    cantBannos: '',
    cantCuartos: '',
    tieneGaraje: false,
    tienePatio: false,
    tieneCarpoch: false,
  };

  constructor(
    private casaService: CasaService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {
    this.provincia = new Provincia();
    this.listadoProvincias = this.provincia.listadoProvincias;
    this.tiposPropiedades.push(TiposPropiedades.APARTAMENTO);
    this.tiposPropiedades.push(TiposPropiedades.BIPLANTA);
    this.tiposPropiedades.push(TiposPropiedades.CASA_INDEPENDIENTE);
    this.tiposPropiedades.push(TiposPropiedades.CASA_SEMI_INDEPENDIENTE);
  }

  async ngOnInit(): Promise<void> {
    activee($);
    await this.getUser();
    await this.loadListado();
  }

  async loadListado(): Promise<void> {
    this.casaService.listCasas().subscribe({
      next: (res) => {
        this.listadoCasas = res.casas;
        console.log(this.listadoCasas);
      },
      complete: () => {
        console.log('complete');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  async getUser(): Promise<void> {
    const id = this.tokenStorageService.getId();
    this.userService.userById(id ? id : '').subscribe({
      next: (res) => {
        this.user = res.user;
        console.log(this.user.myLikes);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onselectProvincia(e: any, id: any): void {
    this.currentP = this.listadoProvincias[id - 1].nombre;
    this.currentM = this.listadoProvincias[id - 1].municipios[0];
    console.log(this.currentM);
    this.listadoMunicipios = this.listadoProvincias[id - 1].municipios;
  }
  onselectMunicipio(e: any, nombre: string): void {
    this.currentM = nombre;
  }
  onselectTP(e: any, tp: string): void {
    this.currentTP =tp;
  }
  onChangeField(e:any):void{
    console.log(e,e.target.value);
    this.formData.delete(e.target.name);
    if(e.target.name==="tieneGaraje" || e.target.name==="tienePatio" || e.target.name==="tieneCarpoch"){
      this.formData.append(e.target.name,e.target.checked);
      console.log(this.formData.get(e.target.name));
    }
    else{
      this.formData.append(e.target.name,e.target.value);
      console.log(this.formData.get(e.target.name));

    }
  }
  search():void{
    this.formData.delete('municipio');
    this.formData.delete('provincia');
    this.formData.delete('tipoPropiedad');
    console.log(this.currentM==="Provicia",this.currentP);
    this.formData.append('municipio',this.currentM==="Municipio"?"":this.currentM);
    this.formData.append('provincia',this.currentP==="Provincia"?"":this.currentP);
    this.formData.append('tipoPropiedad',this.currentTP==="Tipo de Propiedad"?"":this.currentTP);
    this.casaService.buscarCasas(this.formData).subscribe({
      next:(res)=>{console.log(res)},
      error:(res)=>{console.log(res)},
    })

  }
}
