import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { Casa } from 'src/app/models/casa.model';
import { CasaService } from 'src/app/services/casa.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  casas: Casa[] = [];
  user: User = new User();
  constructor(
    private casaService: CasaService,
    private notificationsToastrService: NotificationsToastrService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    activee($);
    const id = this.loginService.userValue?.user?.uid;
    console.log(id);
    if (id) {
      this.userService.userById(id ? id : '').subscribe({
        next: (res) => {
          console.log(res);
          this.user = res.user;
          console.log(this.user?.myLikes);
          this.casasRecientes();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.casasRecientes();
    }
  }
  casasRecientes(): void {
    this.casaService.casaRecientes().subscribe({
      next: (res) => {
        console.log(res);
        this.casas = res.casas;
        console.log(this.casas);
      },
      error: (res) => {
        console.log(res);
        this.notificationsToastrService.showSuccess(
          'Ha ocurrido un error al cargar los datos de las casas recientes.'
        );
      },
    });
  }
}
