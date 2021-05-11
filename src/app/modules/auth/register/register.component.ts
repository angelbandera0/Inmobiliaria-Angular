import { UserValidationsService } from './../../../services/user-validations.service';
import { User } from './../../../models/user.model';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user!: User;
  t1!: string;
  createFailed = false;
  registerForm!: FormGroup;
  fileInputLabel!: string;
  public imagePath: any;
  loading = false;
  imgURL: any;
  message!: string;
  existError = false;
  errorsList: Array<string> = [];
  @ViewChild('FotoPerfil', { static: false })
  fotoPerfil!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userValidations: UserValidationsService
  ) {}

  ngOnInit(): void {
    activee($);
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        passwordconf: new FormControl('', [Validators.required]),
        fotoPerfil: [''],
      },
      {
        validator: this.userValidations.MatchPassword(
          'password',
          'passwordconf'
        ),
      }
    );
    this.t1 = 'Escoja la imagen';
  }

  onSubmit(): void {
    this.loading = true;
    this.errorsList = [];
    this.existError = false;
    console.log(this.registerForm.value);
    const formData = new FormData();
    formData.append('archivo', this.registerForm?.get('fotoPerfil')?.value);
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('email', this.registerForm.get('email')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
    this.userService.createUser(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      complete: () => {
        this.loading = false;
      },
      error: (res) => {
        res.error.errors.forEach((element: any) => {
          this.errorsList.push(element.msg);
        });
        console.log(this.errorsList);
        this.existError = true;
        this.loading = false;
      },
    });
  }

  onFileSelect(event: any, files: any): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    if (event.target.id === 'fotoPerfil') {
      this.t1 = file.name;
      this.registerForm?.get('fotoPerfil')?.setValue(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  get getControl() {
    return this.registerForm.controls;
  }

}
