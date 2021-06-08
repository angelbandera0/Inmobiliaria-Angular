import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserValidationsService } from 'src/app/services/user-validations.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  token!: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userValidations: UserValidationsService,
    private route: ActivatedRoute,
    private notificationsToastrService:NotificationsToastrService

  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.registerForm = this.formBuilder.group(
      {
        password: new FormControl('', [Validators.required]),
        passwordconf: new FormControl('', [Validators.required]),
      },
      {
        validator: this.userValidations.MatchPassword(
          'password',
          'passwordconf'
        ),
      }
    );
  }
  get getControl() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('password', this.registerForm.get('password')?.value);
    this.loginService.changePassword(this.token, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationsToastrService.showSuccess('La contraseña se cambió exitosamente.');
      },
      complete: () => {
        this.loading = false;
      },
      error: (res) => {
        this.loading = false;
        this.notificationsToastrService.showError('Ha ocurrido un error durante el proceso de cambiar la contraseña.');
      },
    });
  }
}
