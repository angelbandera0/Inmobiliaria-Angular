import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MomentService } from 'src/app/services/moment.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { User } from 'src/app/models/user.model';
import { SolicitudService } from 'src/app/services/solicitud.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-solicitudes-dash',
  templateUrl: './listado-solicitudes-dash.component.html',
  styleUrls: ['./listado-solicitudes-dash.component.css']
})
export class ListadoSolicitudesDashComponent implements OnInit {
  isDisablePrev = false;
  isDisableNext = false;
  page: number = 1;
  pageSize: number = 10;
  totalPage: number = 0;
  pageArray: number[] = [];
  currentP: number[] = [];
  solicitudes: Solicitud[] = [];
  solicitudesCurrent: Solicitud[] = [];
  criterio:string="";
  userSol!:User;
  estado = 'Pendiente';
  sortHeadCol: Map<string, boolean> = new Map([
    ['estado', true],
    ['tipoPropiedad', true],
    ['provincia', true],
    ['municipio', true],
    ['precio', true],
    ['createdAt', true],
  ]);

  constructor(
    private momentService: MomentService,
    private modalService: NgbModal,
    private solicitudService:SolicitudService,
    private notificationsToastrService:NotificationsToastrService) { }

  ngOnInit(): void {
    activee($);
    this.loadSolicitudes();
  }
  loadSolicitudes(): void {
    this.solicitudService.getSolicitudes(this.estado).subscribe({
      next: (res) => {
        console.log(res);
        this.solicitudes = res.solicitudes;
        this.change();
      },
      error: (error) => {
        console.log(error);
        this.notificationsToastrService.showError('Ha ocurrido un error cargando el listado de solicitudes.');
      },
    });
  }
  parserFecha(fecha: any): string {
    return this.momentService.obternerSoloFecha(fecha);
  }
  sortTable(event: any): void {
    const campo: string = event.target.id;
    console.log(event.target);
    const dir: any = this.sortHeadCol.get(campo);
    this.sortHeadCol.set(campo, !dir);
    console.log(campo, this.sortHeadCol);
    this.solicitudes = this.sortArraySolicitud(campo, dir, this.solicitudes);
    this.change();
  }

  sortArraySolicitud(
    campo: string,
    direction: boolean,
    unsortedArray: Solicitud[]
  ): Solicitud[] {
    const sortedArray: Solicitud[] = unsortedArray.sort((obj1: any, obj2: any) => {
      return direction
        ? obj1[campo] > obj2[campo]
          ? -1
          : 1
        : obj1[campo] < obj2[campo]
        ? -1
        : 1;
    });
    return sortedArray;
  }
  onPrev(event: any): void {
    this.page -= 1;
    this.change();
  }
  onNext(event: any): void {
    this.page += 1;
    this.change();
  }
  change(): void {
    const aux: Solicitud[] = [];
    this.solicitudes.forEach((e) => {
      if (
        e.user.name.toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.tipoPropiedad.toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.provincia.toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.municipio.toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.precio.toString().toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        this.parserFecha(e.createdAt).toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase())
      ) {
        aux.push(e);
      }
    });

    this.solicitudesCurrent = aux.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
    this.pageArray = [];
    this.totalPage = aux.length / this.pageSize + 1;
    for (let i = 1; i <= this.totalPage; i++) {
      this.pageArray.push(i);
    }
    this.isDisablePrev = this.page == 1;
    this.isDisableNext = this.page == this.pageArray.length;
    this.currentP = [];
    this.currentP = this.pageArray.slice(this.page - 1, 3 + this.page - 1);
    console.log(this.page, this.currentP);
  }
  onSelectPage(event: any, page: number) {
    this.page = page;
    this.change();
  }
  onSelectEstado(estado: string): void {
    this.estado = estado;
    this.loadSolicitudes();
  }
  search(event: any):void {
    this.criterio = event.target.value;
    this.change();
  }
  openModalDialogDeletePropiedad(content: any, user: User) {
    this.userSol=user;
    console.log(this.userSol);
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

}
