import { CasaService } from './../../../services/casa.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Casa } from 'src/app/models/casa.model';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-detalles-casa',
  templateUrl: './detalles-casa.component.html',
  styleUrls: ['./detalles-casa.component.css'],
})
export class DetallesCasaComponent implements OnInit {
  id!: string;
  isLoadImg=false;
  casa!: Casa;
  idVenta!: string;
precioVenta!: number;
formData: FormData = new FormData();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private casaService: CasaService,
    private modalService: NgbModal,
    private notificationsToastrService: NotificationsToastrService

  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getCasaById();
  }
  getCasaById() {
    this.casaService.getCasaById(this.id).subscribe({
      next: (res) => {
        this.casa = res.casa;
        console.log(this.casa);
        console.log(this.casa.img);
        this.isLoadImg=true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openModalDialogAddVenta(content: any, id: string): void {
    this.idVenta = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  onChangePrecioVenta(event: any): void {
    console.log(event);
    this.precioVenta = event.target.value;
  }
  registrarVenta(){
    this.formData.delete('precioVenta');
    this.formData.append('precioVenta', this.precioVenta.toString());
    this.casaService.venderCasa(this.casa._id,this.formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('El registro de venta de la propiedad se efectu?? correctame.')

      },
      error:(error)=>{
        console.log(error);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('Ocurri?? un error en el proceso de registro de venta de la propiedad.');
      },
    });
  }
}
