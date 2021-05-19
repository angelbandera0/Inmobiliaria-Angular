import { MomentService } from './../../../services/moment.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Cita } from 'src/app/models/cita.model';
import { Solicitud } from 'src/app/models/solicitud.model';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-detalles-user',
  templateUrl: './detalles-user.component.html',
  styleUrls: ['./detalles-user.component.css'],
})
export class DetallesUserComponent implements OnInit {
  active = 1;
  id!: string;
  citas!: Cita[];
  solicitudes!: Solicitud[];
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private momentService: MomentService,
  ) {}

  ngOnInit(): void {
    activee($);
    this.id = this.route.snapshot.params['id'];
    this.userService.userAgregaciones(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.user = res.user;
        this.citas = res.userCitas;
        this.solicitudes = res.userSolicitudes;
console.log();

      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  parserFecha(fecha:any){
    return this.momentService.obternerSoloFecha(fecha);
  }
}
