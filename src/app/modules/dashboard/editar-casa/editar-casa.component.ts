import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TiposPropiedades } from 'src/app/enums/tipos-propiedades.enum';
import { Provincia, ProvinciaM } from 'src/app/models/provincia.model';
import { CasaService } from 'src/app/services/casa.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Casa } from 'src/app/models/casa.model';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-editar-casa',
  templateUrl: './editar-casa.component.html',
  styleUrls: ['./editar-casa.component.css'],
})
export class EditarCasaComponent implements OnInit {
  provincia: Provincia;
  id!: string;
  casa!: Casa;
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
    private route: ActivatedRoute,
    private router: Router,
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
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.propiedadForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      numTelefonoPropietario: new FormControl(''),
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

    this.getCasaById();
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
    this.isLoading = true;
    this.clearFormData();
    this.verificarTipoDePropiedad();

    this.formData.append('title', this.propiedadForm?.get('title')?.value);
    this.formData.append('nombre', this.propiedadForm?.get('nombre')?.value);
    this.formData.append(
      'apellidos',
      this.propiedadForm?.get('apellidos')?.value
    );
    this.formData.append(
      'numTelefonoPropietario',
      this.propiedadForm?.get('numTelefonoPropietario')?.value
    );
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

    this.casaService.updateCasa(this.id,this.formData).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
      },
      complete: () => {
        this.notificationsToastrService.showSuccess(
          'La propiedad se modificó con éxito'
        );
        this.isLoading = false;
        console.log('Complete');
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.notificationsToastrService.showError(
          'No se pudo completar la modificación.'
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
    this.formData.delete('title');
    this.formData.delete('localidad');
    this.formData.delete('nombre');
    this.formData.delete('apellidos');
    this.formData.delete('numTelefonoPropietario');
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

  getCasaById() {
    this.casaService.getCasaById(this.id).subscribe({
      next: (res) => {
        this.casa = res.casa;
        console.log(this.casa);
        console.log(this.casa.img);
        this.loadFormData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  //carga los datos de la casa al form
  loadFormData() {
    this.propiedadForm?.get('title')?.setValue(this.casa.title);
    this.propiedadForm?.get('localidad')?.setValue(this.casa.localidad);
    this.propiedadForm?.get('nombre')?.setValue(this.casa.nombre);
    this.propiedadForm?.get('apellidos')?.setValue(this.casa.apellidos);
    this.propiedadForm
      ?.get('numTelefonoPropietario')
      ?.setValue(this.casa.numTelefonoPropietario);
    this.propiedadForm?.get('precio')?.setValue(this.casa.precio);
    this.propiedadForm?.get('bannos')?.setValue(this.casa.cantBannos);
    this.propiedadForm?.get('cuartos')?.setValue(this.casa.cantCuartos);
    this.propiedadForm?.get('garaje')?.setValue(this.casa.tieneGaraje);
    this.propiedadForm?.get('patio')?.setValue(this.casa.tienePatio);
    this.propiedadForm?.get('carpoch')?.setValue(this.casa.tieneCarpoch);
    this.propiedadForm?.get('descripcion')?.setValue(this.casa.description);
    this.currentM = this.casa.municipio;
    this.currentP = this.casa.provincia;

    if (this.casa.tipoPropiedad === TiposPropiedades.APARTAMENTO) {
      this.propiedadForm?.get('apartamento')?.setValue(true);
    } else if (this.casa.tipoPropiedad === TiposPropiedades.BIPLANTA) {
      this.propiedadForm?.get('biplanta')?.setValue(true);
    } else if (
      this.casa.tipoPropiedad === TiposPropiedades.CASA_INDEPENDIENTE
    ) {
      this.propiedadForm?.get('casaindependiente')?.setValue(true);
    } else if (
      this.casa.tipoPropiedad === TiposPropiedades.CASA_SEMI_INDEPENDIENTE
    ) {
      this.propiedadForm?.get('casasemiindependiente')?.setValue(true);
    } else {
      this.propiedadForm?.get('otro')?.setValue(true);
      this.showEspecial = true;
      this.propiedadForm?.get('especial')?.setValue(this.casa.tipoPropiedad);

    }
    this.casa.img.forEach((url) => {
      this.urls.push(url);
    });
    this.t1 = `Se seleccionaron ${this.casa.img.length} imágenes.`;
  }
}
