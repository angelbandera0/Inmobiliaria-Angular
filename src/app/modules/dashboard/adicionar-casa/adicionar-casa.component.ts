import { NotificationsToastrService } from './../../../services/notifications-toastr.service';
import { CasaService } from './../../../services/casa.service';
import { Provincia, ProvinciaM } from './../../../models/provincia.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TiposPropiedades } from 'src/app/enums/tipos-propiedades.enum';

declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-adicionar-casa',
  templateUrl: './adicionar-casa.component.html',
  styleUrls: ['./adicionar-casa.component.css'],
})
export class AdicionarCasaComponent implements OnInit {
  provincia: Provincia;
  showEspecial = false;
  isLoading = false;
  listadoProvincias: ProvinciaM[];
  listadoMunicipios: string[] = [];
  currentP: string = 'Provincia';
  currentM: string = 'Municipio';
  formData: FormData = new FormData();
  propiedadForm!: FormGroup;
  t1: string = '';
  urls: any[] = [];
  @ViewChild('multipleImages', { static: false })
  multipleImages!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private casaService: CasaService,
    private notificationsToastrService: NotificationsToastrService
  ) {
    this.provincia = new Provincia();
    this.listadoProvincias = this.provincia.listadoProvincias;
  }

  ngOnInit(): void {
    activee($);
    //(document.querySelector('.nice-select') as HTMLElement).style.width ='100% !important';
    $('.nice-select').attr('style', 'width: 100% !important;');
    $('.list').attr('style', 'width: 100% !important');
    console.log(this.listadoProvincias);
    this.propiedadForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      apartamento: new FormControl(false),
      casaindependiente: new FormControl(false),
      casasemiindependiente: new FormControl(false),
      biplanta: new FormControl(false),
      otro: new FormControl(false),
      especial: new FormControl(''),
      precio: new FormControl('', [
        Validators.pattern('^[0-9]*'),
        Validators.required,
      ]),
      bannos: new FormControl('', [
        Validators.pattern('^[0-9]*'),
        Validators.required,
      ]),
      cuartos: new FormControl('', [
        Validators.pattern('^[0-9]*'),
        Validators.required,
      ]),
      garaje: new FormControl(false),
      patio: new FormControl(false),
      carpoch: new FormControl(false),
      descripcion: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    //this.prov.nativeElement.insertAdjacentHTML('beforeend', '<option values="" _ngcontent-rig-c110="">two</option>');
  }
  onselectProvincia(e: any, id: any) {
    //console.log(e);
    //console.log(id);
    this.currentP = this.listadoProvincias[id - 1].nombre;
    this.currentM = this.listadoProvincias[id - 1].municipios[0];
    console.log(this.currentM);
    this.listadoMunicipios = this.listadoProvincias[id - 1].municipios;
    //console.log(this.listadoMunicipios);
  }
  onselectMunicipio(e: any, nombre: string) {
    //console.log(this.currentM + '1');

    this.currentM = nombre;
  }
  onSubmit(): void {
    console.log(this.propiedadForm);
    this.isLoading=true;
    this.clearFormData();
    this.verificarTipoDePropiedad();

    this.formData.append('name', this.propiedadForm?.get('name')?.value);
    this.formData.append(
      'localidad',
      this.propiedadForm?.get('localidad')?.value
    );
    this.formData.append('precio', this.propiedadForm?.get('precio')?.value);
    this.formData.append(
      'cantBannos',
      this.propiedadForm?.get('bannos')?.value
    );
    this.formData.append(
      'cantCuartos',
      this.propiedadForm?.get('cuartos')?.value
    );
    this.formData.append(
      'tieneGaraje',
      this.propiedadForm?.get('garaje')?.value
    );
    this.formData.append('tienePatio', this.propiedadForm?.get('patio')?.value);
    this.formData.append(
      'tieneCarpoch',
      this.propiedadForm?.get('carpoch')?.value
    );
    this.formData.append(
      'description',
      this.propiedadForm?.get('descripcion')?.value
    );
    this.formData.append('municipio', this.currentM);
    this.formData.append('provincia', this.currentP);

    this.casaService.createCasa(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading=false;
      },
      complete: () => {
        this.notificationsToastrService.showSuccess(
          'La propiedad se registro con éxito'
        );
        this.isLoading=false;
        console.log('Complete');
      },
      error: (error) => {
        console.log(error);
        this.isLoading=false;
        this.notificationsToastrService.showError(
          'No se pudo completar el registro.'
        );
      },
    });
  }

  //evento para cuando se selecionan las imagenes
  onMultipleSelect(event: any) {
    const files: FileList = event.target.files;
    //asegura de limpiar q no exista nada en archivo
    this.formData.delete('archivo');
    this.urls = [];
    console.log('Imagenes:', files);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      let reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = (events: any) => {
        this.urls.push(events.target.result);
      };
      console.log(element);
      this.formData.append('archivo', element);
    }
    this.t1 = `Se seleccionaron ${files.length} imágenes.`;
    //console.log(this.formData.get('archivo'));
  }

  //establece el tipo de propiedad según la casilla marcada
  verificarTipoDePropiedad(): void {
    if (this.propiedadForm?.get('apartamento')?.value) {
      this.formData.append('tipoPropiedad', TiposPropiedades.APARTAMENTO);
    } else if (this.propiedadForm?.get('biplanta')?.value) {
      this.formData.append('tipoPropiedad', TiposPropiedades.BIPLANTA);
    } else if (this.propiedadForm?.get('casaindependiente')?.value) {
      this.formData.append(
        'tipoPropiedad',
        TiposPropiedades.CASA_INDEPENDIENTE
      );
    } else if (this.propiedadForm?.get('casasemiindependiente')?.value) {
      this.formData.append(
        'tipoPropiedad',
        TiposPropiedades.CASA_SEMI_INDEPENDIENTE
      );
    } else {
      //falta hacer esta parte
      this.formData.append(
        'tipoPropiedad',
        this.propiedadForm?.get('especial')?.value
      );
    }
  }

  //limpia el formData
  clearFormData() {
    this.formData.delete('name');
    this.formData.delete('localidad');
    this.formData.delete('precio');
    this.formData.delete('tipoPropiedad');
    this.formData.delete('cantBannos');
    this.formData.delete('cantCuartos');
    this.formData.delete('tieneGaraje');
    this.formData.delete('tienePatio');
    this.formData.delete('tieneCarpoch');
    this.formData.delete('description');
    this.formData.delete('municipio');
    this.formData.delete('provincia');
  }
  //asegura que solo se marque un checkbox
  onSelectCheck(event: any, id: any) {
    const arr: string[] = [
      'apartamento',
      'casaindependiente',
      'casasemiindependiente',
      'biplanta',
      'otro',
    ];
    console.log(id);
    arr.forEach((e, index) => {
      if (index != id) {
        this.setFormCheckToFalse(e);
      }
    });
    this.showEspecial = id === 4;
  }

  setFormCheckToFalse(id: string) {
    console.log(id);
    this.propiedadForm.get(id)?.setValue(false);
  }
  get getControl() {
    return this.propiedadForm.controls;
  }
}
