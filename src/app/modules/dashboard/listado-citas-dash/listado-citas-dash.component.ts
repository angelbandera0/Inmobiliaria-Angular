import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { CitaService } from './../../../services/cita.service';
import { MomentService } from './../../../services/moment.service';
import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-citas-dash',
  templateUrl: './listado-citas-dash.component.html',
  styleUrls: ['./listado-citas-dash.component.css'],
})
export class ListadoCitasDashComponent implements OnInit {
  isDisablePrev = false;
  isDisableNext = false;
  page: number = 1;
  pageSize: number = 10;
  totalPage: number = 0;
  pageArray: number[] = [];
  currentP: number[] = [];
  citas: Cita[] = [];
  citasCurrent: Cita[] = [];
  criterio:string="";
  userSol!:User;
  estado = 'Pendiente';
  sortHeadCol: Map<string, boolean> = new Map([
    ['estado', true],
    ['fecha', true],
    ['createdAt', true],
  ]);
  constructor(
    private momentService: MomentService,
    private modalService: NgbModal,
    private citaService: CitaService,
    private notificationsToastrService:NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.loadCitas();
  }
  loadCitas(): void {
    this.citaService.getCitas(this.estado).subscribe({
      next: (res) => {
        console.log(res);
        this.citas = res.citas;
        this.change();
      },
      error: (error) => {
        console.log(error);
        this.notificationsToastrService.showError('Ha ocurrido un error cargando el listado de citas.');
      },
    });
  }

  parserFecha(fecha: any): string {
    return this.momentService.obternerSoloFecha(fecha);
  }
  sortTable(event: any): void {
    const campo: string = event.target.id;
    const dir: any = this.sortHeadCol.get(campo);
    this.sortHeadCol.set(campo, !dir);
    console.log(campo, this.sortHeadCol);
    this.citas = this.sortArrayCita(campo, dir, this.citas);
    this.change();
  }

  sortArrayCita(
    campo: string,
    direction: boolean,
    unsortedArray: Cita[]
  ): Cita[] {
    const sortedArray: Cita[] = unsortedArray.sort((obj1: any, obj2: any) => {
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
    const aux: Cita[] = [];
    this.citas.forEach((e) => {
      if (
        this.parserFecha(e.fecha).toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.user.name.toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        this.parserFecha(e.createdAt).toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase())
      ) {
        aux.push(e);
      }
    });

    this.citasCurrent = aux.slice(
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
    this.loadCitas();
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
