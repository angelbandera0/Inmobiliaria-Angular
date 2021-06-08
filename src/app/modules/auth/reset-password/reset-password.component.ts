import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserValidationsService } from 'src/app/services/user-validations.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private notificationsToastrService:NotificationsToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
      });

  }
  get getControl() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('email', this.registerForm.get('email')?.value);
    this.loginService.solicitarLinkSetPassword(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationsToastrService.showSuccess('Revice su correo el link se ha enviado correctamente.');
      },
      complete: () => {
        this.loading = false;
      },
      error: (res) => {
        this.loading = false;
        this.notificationsToastrService.showSuccess('Ha ocurrido un error en el proceso de enviar el link.');

      },
    });
  }

}
