import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from 'src/app/models/cita.model';
import { CitaService } from 'src/app/services/cita.service';
import { MomentService } from 'src/app/services/moment.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-detalles-cita-cms',
  templateUrl: './detalles-cita-cms.component.html',
  styleUrls: ['./detalles-cita-cms.component.css']
})
export class DetallesCitaCmsComponent implements OnInit {
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

}
