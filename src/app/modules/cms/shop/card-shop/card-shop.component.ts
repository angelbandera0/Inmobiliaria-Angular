import { LoginService } from 'src/app/services/login.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from 'src/app/enums/roles.enum';
import { Casa } from 'src/app/models/casa.model';
import { User } from 'src/app/models/user.model';
import { CasaService } from 'src/app/services/casa.service';
import { LikesService } from 'src/app/services/likes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.css'],
})
export class CardShopComponent implements OnInit {
  @Input() casa!: Casa;
  @Input() user!: User;
  @Output() deleteRequest = new EventEmitter<string>();
  idDelete!: string;
  isLiked = false;
  isUser = false;
  like: any;
  constructor(
    private casaService: CasaService,
    private likesService: LikesService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    console.log(this.user);
    this.isUser =
      this.loginService.userValue?.user?.rol.rol === Roles.USER_ROLE &&
      this.loginService.userValue?.user?.rol.rol != null;
    try {
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
    } catch (error) {}
  }

  openModalDialogDeletePropiedad(content: any, id: string) {
    this.idDelete = id;
    this.modalService.open(content, { modalDialogClass: 'dark-modal' });
  }
  deleteCasa(): void {
    this.casaService.deleteCasa(this.idDelete).subscribe({
      complete: () => {
        console.log('complete');
        this.modalService.dismissAll();
        this.deleteRequest.emit();
      },
      error: (e) => {
        console.log('error');
      },
    });
  }
  addLike(idCasa: string): void {
    console.log(idCasa);
    const fd = new FormData();
    fd.append('idCasa', idCasa);
    console.log(this.likesService);
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
}
