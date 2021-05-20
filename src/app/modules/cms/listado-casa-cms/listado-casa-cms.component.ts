import { Component, OnInit } from '@angular/core';
import { TiposPropiedades } from 'src/app/enums/tipos-propiedades.enum';
import { Casa } from 'src/app/models/casa.model';
import { Provincia, ProvinciaM } from 'src/app/models/provincia.model';
import { User } from 'src/app/models/user.model';
import { CasaService } from 'src/app/services/casa.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-casa-cms',
  templateUrl: './listado-casa-cms.component.html',
  styleUrls: ['./listado-casa-cms.component.css'],
})
export class ListadoCasaCmsComponent implements OnInit {
  posInicialMostrar: number = 0;
  limiteMostrar: number = 15;
  totalCasa!:number;
  provincia: Provincia;
  listadoProvincias: ProvinciaM[];
  listadoMunicipios: string[] = [];
  tiposPropiedades: string[] = [];
  currentP: string = 'Provincia';
  currentM: string = 'Municipio';
  currentTP: string = 'Tipo de Propiedad';
  listadoCasas: Casa[]=[];
  user: User = new User();
  idDelete!: string;
  formData = new FormData();
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
    const id = this.tokenStorageService.getId();
    this.userService.userById(id ? id : 'none').subscribe({
      next: (res) => {
        console.log(res);
        this.user = res.user;
        console.log(this.user.myLikes);
        this.loadListado();
      },
      error: (error) => {
        console.log(error);
      },
    });

    console.log('object');
  }

  async loadListado(): Promise<void> {
    this.restartPagination();
    this.casaService.buscarCasas(this.formData,this.posInicialMostrar,this.limiteMostrar).subscribe({
      next: (res) => {
        console.log(res);
        this.listadoCasas = res.casas;
        this.totalCasa=res.total;
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
    this.userService.userById(id ? id : 'none').subscribe({
      next: (res) => {
        console.log(res);
        this.user = res.user;
        console.log(this.user.myLikes);
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
    this.currentTP = tp;
  }
  onChangeField(e: any): void {
    console.log(e, e.target.value);
    this.formData.delete(e.target.name);
    if (
      e.target.name === 'tieneGaraje' ||
      e.target.name === 'tienePatio' ||
      e.target.name === 'tieneCarpoch'
    ) {
      this.formData.append(e.target.name, e.target.checked);
      console.log(this.formData.get(e.target.name));
    } else {
      if (e.target.value !== '') {
        this.formData.append(e.target.name, e.target.value);
      }
      console.log(this.formData.get(e.target.name));
    }
  }
  search(): void {
    this.restartPagination();
    this.formData.delete('municipio');
    this.formData.delete('provincia');
    this.formData.delete('tipoPropiedad');
    console.log(this.currentM === 'Provicia', this.currentP);
    if (this.currentM !== 'Municipio') {
      this.formData.append('municipio', this.currentM);
    }
    if (this.currentP !== 'Provincia') {
      this.formData.append('provincia', this.currentP);
    }
    if (this.currentTP !== 'Tipo de Propiedad') {
      this.formData.append('tipoPropiedad', this.currentTP);
    }
    this.casaService.buscarCasas(this.formData,this.posInicialMostrar,this.limiteMostrar).subscribe({
      next: (res) => {
        console.log(res);
        this.listadoCasas = res.casas;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  restartPagination(): void {
    this.posInicialMostrar = 0;
    this.limiteMostrar = 15;
  }
  mostrarMas(){
    console.log('A:',this.posInicialMostrar);
    this.posInicialMostrar+=this.limiteMostrar;
    console.log('D:',this.posInicialMostrar);
    console.log('L:',this.listadoCasas.length);


    this.casaService.buscarCasas(this.formData,this.posInicialMostrar,this.limiteMostrar).subscribe({
      next: (res) => {
        this.listadoCasas=this.listadoCasas.concat(res.casas);
        //this.listadoCasas = res.casas;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

}
