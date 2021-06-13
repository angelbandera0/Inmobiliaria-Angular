import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { SocketsService } from './../../../services/sockets.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';

@Component({
  selector: 'app-confirnm-account',
  templateUrl: './confirnm-account.component.html',
  styleUrls: ['./confirnm-account.component.css'],
})
export class ConfirnmAccountComponent implements OnInit {
  socket: any;
  isVerified = false;
  loading = false;
  id!: string;
  email!: string | null;
  constructor(
    private socketsService: SocketsService,
    private userService: UserService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private notificationsToastrService: NotificationsToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.userService.userById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.isVerified = res.user.isVerified;
        if (this.isVerified) {
          this.notificationsToastrService.showSuccess(
            'Su cuenta ya ha sido verificada.'
          );
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
    this.socketsService.listen('confirm').subscribe((data) => {
      console.log(data);
      this.isVerified = data ? true : false;
      this.loading = data ? true : false;
    });
  }
  resendEmail(): void {
    this.loading = true;
    const data = new FormData();
    data.delete('email');
    data.append('email', this.email + '');
    this.loginService.resendCorfirmationEmail(data).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationsToastrService.showSuccess(
          'Revice su correo el email se ha enviado satisfactoriamente.'
        );
        this.loading = false;
      },
      error: (res) => {
        console.log(res);
        this.notificationsToastrService.showError(
          'Ha ocurrido un error intentando enviar el email.'
        );
        this.loading = false;
      },
    });
  }
}
