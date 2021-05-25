import { NotificationsToastrService } from './../../../services/notifications-toastr.service';
import { MomentService } from './../../../services/moment.service';
import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Cita } from 'src/app/models/cita.model';
import { Solicitud } from 'src/app/models/solicitud.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  t1!: string;
  citas!: Cita[];
  solicitudes!: Solicitud[];
  fileInputLabel!: string;
  imgURL: any;
  user!: User;
  formData: FormData = new FormData();
  public imagePath: any;
  @ViewChild('FotoPerfil', { static: false })
  fotoPerfil!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private momentService: MomentService,
    private modalService: NgbModal,private notificationsToastrService:NotificationsToastrService
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
        this.t1=res.user.image;
        console.log();
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  parserFecha(fecha: any) {
    return this.momentService.obternerSoloFecha(fecha);
  }
  openModalDialogAddCita(content: any, id: string) {
    //this.idDelete = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  onFileSelect(event: any, files: any) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    if (event.target.id === 'fotoPerfil') {
      this.t1 = file.name;
      //this.registerForm?.get('fotoPerfil')?.setValue(file);
      this.formData.delete("archivo");
      this.formData.append("archivo",file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  onSubmit() {
    this.userService.userPut(this.id,this.formData).subscribe({
      next: (res) => {
        console.log(res);
        console.log();
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('Se actualizó correctamente el perfil.');
      },
      complete:()=>{

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
      },
      error: (res) => {
        console.log(res);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('Ocurrió un error al actualizar el perfil.');
      },
    });
  }
  modify(e: any) {
    if (e.target.value !== '') {
      console.log(e.target.name, e.target.value);
      this.formData.delete(e.target.name);
      this.formData.append(e.target.name, e.target.value);
    } else {
      this.formData.delete(e.target.name);
    }
  }
}
