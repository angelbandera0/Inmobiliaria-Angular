import { CitaService } from './../../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Casa } from 'src/app/models/casa.model';
import { CasaService } from 'src/app/services/casa.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;

@Component({
  selector: 'app-detalles-casa-cms',
  templateUrl: './detalles-casa-cms.component.html',
  styleUrls: ['./detalles-casa-cms.component.css'],
})
export class DetallesCasaCmsComponent implements OnInit {
  id!: string;
  isLoadImg = false;
  casa!: Casa;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private casaService: CasaService,
    private citaService: CitaService,
    private modalService: NgbModal,
    private notificationsToastrService: NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getCasaById();
  }
  getCasaById() {
    this.casaService.getCasaById(this.id).subscribe({
      next: (res) => {
        this.casa = res.casa;
        console.log(this.casa);
        console.log(this.casa.img);
        this.isLoadImg = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openModalDialogAddCita(content: any, id: string) {
    //this.idDelete = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  addCita() {
    const formData = new FormData();
    formData.append('idCasa', this.id);
    this.citaService.addCita(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('La solicitud de cita ha sido enviada satisfactoriamente. El rechazo o la aprobación se les notificará adecuadamente.')
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showError('Ha ocurrido un error en el envío de la solicitud');
      },
    });
  }
}
