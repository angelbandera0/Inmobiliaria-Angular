import { Solicitud } from 'src/app/models/solicitud.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';


declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;

@Component({
  selector: 'app-detalles-solicitud-cms',
  templateUrl: './detalles-solicitud-cms.component.html',
  styleUrls: ['./detalles-solicitud-cms.component.css']
})
export class DetallesSolicitudCmsComponent implements OnInit {
  id!: string;
  isLoadImg = false;
  solicitud!: Solicitud;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService,
    private modalService: NgbModal,
    private notificationsToastrService: NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getSolicitudById();
  }
  getSolicitudById() {
    this.solicitudService.getSolicitudById(this.id).subscribe({
      next: (res) => {
        this.solicitud = res.solicitud;
        console.log(this.solicitud);
        console.log(this.solicitud.img);
        this.isLoadImg = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openModalDialogConfirm(content: any) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  openModalDialogCancel(content: any) {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }

  denegarSolicitud(): void {
    this.solicitudService.deleteSolicitud(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess(
          'La solicitud de publicación de propiedad se denegó correctamente.'
        );
        this.router.navigate(['/dashboard/listadosolicitudes']);
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showError(
          'Ocurrió un error en el proceso de denegar la solicitud de publicación de propiedad.'
        );
      },
    });
  }

  aprobar(): void {
    const formData = new FormData();
    formData.append('title', this.solicitud.title);
    formData.append('nombre', this.solicitud.nombre);
    formData.append('apellidos', this.solicitud.apellidos);
    formData.append(
      'numTelefonoPropietario',
      this.solicitud.numTelefonoPropietario
    );
    formData.append('localidad', this.solicitud.localidad);
    formData.append('precio', this.solicitud.precio.toString());
    formData.append('cantBannos', this.solicitud.cantBannos.toString());
    formData.append('cantCuartos', this.solicitud.cantCuartos.toString());
    formData.append('tieneGaraje', this.solicitud.tieneGaraje + '');
    formData.append('tienePatio', this.solicitud.tienePatio + '');
    formData.append('tieneCarpoch', this.solicitud.tieneCarpoch + '');
    formData.append('description', this.solicitud.description);
    formData.append('municipio', this.solicitud.municipio);
    formData.append('provincia', this.solicitud.provincia);
    formData.append('tipoPropiedad', this.solicitud.tipoPropiedad);
    this.solicitud.img.forEach((e) => {
      formData.append('img', e);
    });
    this.solicitudService.aprobarSolicitud(this.id, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess(
          'La solicitud de publicación de propiedad se aprobó correctamente.'
        );
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showError(
          'Ocurrió un error en el proceso de aprobar la solicitud de publicación de propiedad.'
        );
      },
    });
  }
}
