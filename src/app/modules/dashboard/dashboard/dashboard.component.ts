import { VentaService } from 'src/app/services/venta.service';
import { CitaService } from 'src/app/services/cita.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { Cita } from 'src/app/models/cita.model';
import { Venta } from 'src/app/models/venta.model';
import { MomentService } from 'src/app/services/moment.service';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  solicitudesShow!: Solicitud[];
  solicitudesAll: Solicitud[] = [];

  citasShow!: Cita[];
  citasAll: Cita[] = [];

  ventasShow!: Venta[];
  ventasAll: Venta[] = [];

  filterDay: Map<string, boolean> = new Map([
    ['hoy', true],
    ['semana', false],
    ['mes', false],
    ['anno', false],
  ]);

  constructor(
    private solicitudService: SolicitudService,
    private citaService: CitaService,
    private ventaService: VentaService,
    private momentService: MomentService
  ) {}

  ngOnInit(): void {
    activee($);
    this.getSolicitudes();
    this.getCitas();
    this.getVentas();
    console.log(
      this.momentService.estaEnRango(
        new Date(),
        this.momentService.obternerFecha1AnnoAtras()
      )
    );
  }
  parserFecha(fecha: any): string {
    return this.momentService.obternerSoloFecha(fecha);
  }
  getSolicitudes(): void {
    this.solicitudService.getSolicitudes('Pendiente').subscribe({
      next: (res) => {
        this.solicitudesShow = [];
        if (res.solicitudes) {
          this.solicitudesAll = res.solicitudes;
          this.solicitudesShow = this.filtroDias(this.solicitudesAll);
          this.solicitudesShow = this.sort(this.solicitudesShow);
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  getCitas(): void {
    this.citaService.getCitas('Pendiente').subscribe({
      next: (res) => {
        this.citasShow = [];
        if (res.citas) {
          this.citasAll = res.citas;
          this.citasShow = this.filtroDias(this.citasAll);
          this.citasShow = this.sort(this.citasShow);
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  getVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (res) => {
        this.ventasShow = [];
        if (res.casas) {
          this.ventasAll = res.casas;
          this.ventasShow = this.filtroDias(this.ventasAll);
          this.ventasShow = this.sort(this.ventasShow);
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  // helpers
  setSelection(event: any, option: string): void {
    this.filterDay.forEach((e, key) => {
      this.filterDay.set(key, key === option);
    });
    this.citasShow = this.filtroDias(this.citasAll);
    this.citasShow = this.sort(this.citasShow);
    this.ventasShow = this.filtroDias(this.ventasAll);
    this.ventasShow = this.sort(this.ventasShow);
    this.solicitudesShow = this.filtroDias(this.solicitudesAll);
    this.solicitudesShow = this.sort(this.solicitudesShow);
  }

  sort(collection: any): any {
    const sortedArray = collection.sort((obj1: any, obj2: any) => {
      return true
        ? obj1.createdAt > obj2.createdAt
          ? -1
          : 1
        : obj1.createdAt < obj2.createdAt
        ? -1
        : 1;
    });
    return sortedArray;
  }

  filtroDias(collection: any[]): any[] {
    return collection.filter((element: any) => {
      const fecha: any = element.createdAt;
      if (this.filterDay.get('hoy')) {
        return this.momentService.esFechaActual(fecha);
      } else if (this.filterDay.get('semana')) {
        return this.momentService.estaEnRango(
          fecha,
          this.momentService.obternerFecha7DiasAtras()
        );
      } else if (this.filterDay.get('mes')) {
        return this.momentService.estaEnRango(
          fecha,
          this.momentService.obternerFecha1MesAtras()
        );
      } else {
        return this.momentService.estaEnRango(
          fecha,
          this.momentService.obternerFecha1AnnoAtras()
        );
      }
    });
  }
}
