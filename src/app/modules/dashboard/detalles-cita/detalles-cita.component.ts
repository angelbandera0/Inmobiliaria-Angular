import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { MomentService } from './../../../services/moment.service';
import { CitaService } from './../../../services/cita.service';
import { Cita } from './../../../models/cita.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-detalles-cita',
  templateUrl: './detalles-cita.component.html',
  styleUrls: ['./detalles-cita.component.css'],
})
export class DetallesCitaComponent implements OnInit {
  id!: string;
  cita!: Cita;
  isLoadImg = false;
  fecha!: string;
  text!: string;
  formData: FormData = new FormData();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private momentService: MomentService,
    private modalService: NgbModal,
    private notificationsToastrService: NotificationsToastrService
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params.id;
    this.getCitaById();
  }
  parserFecha(fecha: any): string {
    return this.momentService.obternerSoloFecha(fecha);
  }

  getCitaById(): void {
    this.citaService.getCitaById(this.id).subscribe({
      next: (res) => {
        console.log(res);

        this.cita = res.cita;
        this.isLoadImg = true;
      },
      error: (res) => {
        console.log(res);
        this.notificationsToastrService.showError(
          'Ha ocurrido un error en cargar los datos de la cita.'
        );
      },
    });
  }
  openModalDialogConfirm(content: any): void {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  openModalDialogCancel(content: any): void {
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  onChangeFecha(event: any): void {
    console.log(event);
    this.fecha = event.target.value;
  }
  onChangeText(event: any): void {
    console.log(event);
    this.text = event.target.value;
  }
  confirmarCita(): void {
    this.formData.delete('subject');
    this.formData.append('subject', 'Confirmación de la aprobación de la cita');

    this.formData.delete('fecha');
    this.formData.append('fecha', this.fecha);

    this.formData.delete('text');
    this.formData.append(
      'text',
      `Su cita ha sido aprobada y concertada para el ${this.parserFecha(
        this.fecha
      )}. Los datos de la cita son: ${this.text}`
    );

    this.citaService.aprobarCita(this.id, this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getCitaById();
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess(
          'La cita se aprobó correctamente.'
        );
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showError(
          'Ocurrió un error en la aprobación de la cita.'
        );
      },
    });
  }

  denegarCita(): void {
    this.citaService.deleteCita(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess(
          'La cita se denegó correctamente.'
        );
        this.router.navigate(['/dashboard/listadocitas']);
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showError(
          'Ocurrió un error en el proceso de denegar la cita.'
        );
      },
    });
  }
}
