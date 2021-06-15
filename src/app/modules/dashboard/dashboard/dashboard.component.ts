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

  constructor(
    private solicitudService: SolicitudService,
    private citaService: CitaService,
    private ventaService: VentaService,
    private momentService: MomentService,

  ) {}

  ngOnInit(): void {
    activee($);
    this.getSolicitudes();
    this.getCitas();
    this.getVentas();
  }
  parserFecha(fecha: any): string {
    return this.momentService.obternerSoloFecha(fecha);
  }
  getSolicitudes(): void {
    this.solicitudService.getSolicitudes('Pendiente').subscribe({
      next: (res) => {

        this.solicitudesShow = [];
        this.solicitudesShow = res.solicitudes;
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
        if(res.citas){
          this.citasShow = res.citas;
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
        this.ventasShow = res.casas;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}
