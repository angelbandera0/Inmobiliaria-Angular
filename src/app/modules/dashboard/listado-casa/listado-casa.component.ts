import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { LikesService } from './../../../services/likes.service';
import { CasaService } from './../../../services/casa.service';
import { Component, OnInit } from '@angular/core';
import { Casa } from 'src/app/models/casa.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/user.model';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-listado-casa',
  templateUrl: './listado-casa.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./listado-casa.component.css'],
})
export class ListadoCasaComponent implements OnInit {
  listadoCasas!: Casa[];
  user!: User;
  idDelete!: string;
  constructor(
    private casaService: CasaService,
    private modalService: NgbModal,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    activee($);
    await this.getUser();
    await this.loadListado();
  }

  async loadListado(): Promise<void> {
    this.casaService.listCasas().subscribe({
      next: (res) => {
        this.listadoCasas = res.casas;
        console.log(this.listadoCasas);
      },
      complete: () => {
        console.log('complete');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  async getUser(): Promise<void> {
    const id = this.tokenStorageService.getId();
    this.userService.userById(id ? id : '').subscribe({
      next: (res) => {
        this.user = res.user;
        console.log(this.user.myLikes);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  existeLike(likesCasas: any): boolean {
    for (let i = 0; i < likesCasas.length; i++) {
      if ((this.user.myLikes as unknown as string[]).includes(likesCasas[i])) {
        console.log('si');
        return true;
      }
    }

    return false;
  }
}
