import { Venta } from './../../../models/venta.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MomentService } from 'src/app/services/moment.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { VentaService } from 'src/app/services/venta.service';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-ventas-dash',
  templateUrl: './listado-ventas-dash.component.html',
  styleUrls: ['./listado-ventas-dash.component.css']
})
export class ListadoVentasDashComponent implements OnInit {
  isDisablePrev = false;
  isDisableNext = false;
  page: number = 1;
  pageSize: number = 10;
  totalPage: number = 0;
  pageArray: number[] = [];
  currentP: number[] = [];
  ventas: Venta[] = [];
  ventasCurrent: Venta[] = [];
  criterio:string="";
  idDelete!:string;
  idVenta!:string;
  precioVenta!:number
  sortHeadCol: Map<string, boolean> = new Map([
    ['precioVenta', true],
    ['comision', true],
    ['createdAt', true],
    ['updatedAt', true],
  ]);
  constructor(
    private momentService: MomentService,
    private modalService: NgbModal,
    private ventaService: VentaService,
    private notificationsToastrService:NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.loadVentas();
  }
  loadVentas(): void {
    this.ventaService.getVentas().subscribe({
      next: (res) => {
        console.log(res);
        this.ventas = res.casas;
        this.change();
      },
      error: (error) => {
        console.log(error);
        this.notificationsToastrService.showError('Ha ocurrido un error cargando el listado de ventas.');
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
    this.ventas = this.sortArrayVenta(campo, dir, this.ventas);
    this.change();
  }

  sortArrayVenta(
    campo: string,
    direction: boolean,
    unsortedArray: Venta[]
  ): Venta[] {
    const sortedArray: Venta[] = unsortedArray.sort((obj1: any, obj2: any) => {
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
    const aux: Venta[] = [];
    this.ventas.forEach((e:Venta) => {
      if (
        this.parserFecha(e.precioVenta).toString().toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        e.comision.toString().toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        this.parserFecha(e.createdAt).toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase()) ||
        this.parserFecha(e.updatedAt).toLocaleLowerCase().includes(this.criterio.toLocaleLowerCase())
      ) {
        aux.push(e);
      }
    });

    this.ventasCurrent = aux.slice(
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
  onSelectPage(event: any, page: number):void {
    this.page = page;
    this.change();
  }
  onSelectEstado(estado: string): void {
    this.loadVentas();
  }
  search(event: any):void {
    this.criterio = event.target.value;
    this.change();
  }
  openModalDialogDeleteVenta(content: any,id:string):void {
    this.idDelete=id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  openModalDialogEditVenta(content: any,id:string,precio:number):void {
    this.idVenta=id;
    console.log(precio);
    this.precioVenta=precio;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  deleteVenta():void{
    this.ventaService.deleteVenta(this.idDelete).subscribe({
      complete: () => {
        console.log('complete');
        this.modalService.dismissAll();
        this.loadVentas();
        this.notificationsToastrService.showSuccess(
          'La venta se eliminó correctamente.'
        );
      },
      error: (e) => {
        console.log('error');
        this.notificationsToastrService.showError(
          'Ocurrión un error en el procesos de eliminar la venta.'
        );
      },
    });
  }
  onChangePrecioVenta(event: any): void {
    console.log(event);
    this.precioVenta = event.target.value;
  }
  editarVenta(){
    const formData=new FormData();
    formData.append('precioVenta',this.precioVenta.toString());
    this.ventaService.putVenta(this.idVenta,formData).subscribe({
      complete: () => {
        console.log('complete');
        this.modalService.dismissAll();
        this.loadVentas();
        this.notificationsToastrService.showSuccess(
          'La venta se actualizó correctamente.'
        );
      },
      error: (e) => {
        console.log('error');
        this.modalService.dismissAll();
        this.notificationsToastrService.showError(
          'Ocurrión un error en el proceso de actualización la venta.'
        );
      },
    });

  }
}
