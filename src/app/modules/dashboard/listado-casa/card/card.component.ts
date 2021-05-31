import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from 'src/app/enums/roles.enum';
import { Casa } from 'src/app/models/casa.model';
import { User } from 'src/app/models/user.model';
import { CasaService } from 'src/app/services/casa.service';
import { LikesService } from 'src/app/services/likes.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() casa!: Casa;
  @Input() user!: User;
  @Output() deleteRequest = new EventEmitter<string>();
  @Output() ventaRequest = new EventEmitter<string>();
  idDelete!: string;
  idVenta!: string;
  isLiked = false;
  isUser = false;
  like: any;
  precioVenta!: number;
  formData: FormData = new FormData();

  constructor(
    private casaService: CasaService,
    private likesService: LikesService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private notificationsToastrService: NotificationsToastrService
  ) {
    console.log(this.user);
    this.isUser =
      this.tokenStorageService.getAuthorities() === Roles.USER_ROLE &&
      this.tokenStorageService.getAuthorities() != null;
  }

  ngOnInit(): void {
    for (let i = 0; i < this.casa.likes.length; i++) {
      if (
        (this.user.myLikes as unknown as string[]).includes(
          this.casa.likes[i] as unknown as string
        )
      ) {
        console.log('si');
        this.isLiked = true;
        this.like = this.casa.likes[i];
        this.casa.like = this.casa.likes[i];
      }
    }
  }

  openModalDialogDeletePropiedad(content: any, id: string): void {
    this.idDelete = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  openModalDialogAddVenta(content: any, id: string): void {
    this.idVenta = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  deleteCasa(): void {
    this.casaService.deleteCasa(this.idDelete).subscribe({
      complete: () => {
        console.log('complete');
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess(
          'La propiedad se eliminó correctamente.'
        );
        this.deleteRequest.emit();
      },
      error: (e) => {
        console.log('error');
        this.notificationsToastrService.showSuccess(
          'Ocurrión un error al eliminar la propiedad.'
        );
      },
    });
  }
  addLike(idCasa: string): void {
    console.log(idCasa);
    const fd = new FormData();
    fd.append('idCasa', idCasa);
    this.likesService.addLike(fd).subscribe({
      next: (res) => {
        console.log(res);
        this.like = res.like._id;
        this.isLiked = true;
        //window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  removeLike(idLike: string): void {
    console.log('Like id: ', idLike);
    this.likesService.removeLike(idLike).subscribe({
      next: (res) => {
        console.log(res);
        this.like = undefined;
        this.isLiked = false;
      },
      error: (e) => {
        console.log(e);
      },
    });
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
        this.notificationsToastrService.showSuccess('El registro de venta de la propiedad se efectuó correctame.')
        this.ventaRequest.emit();
      },
      error:(error)=>{
        console.log(error);
        this.modalService.dismissAll();
        this.notificationsToastrService.showSuccess('Ocurrió un error en el proceso de registro de venta de la propiedad.');
      },
    });
  }
}
