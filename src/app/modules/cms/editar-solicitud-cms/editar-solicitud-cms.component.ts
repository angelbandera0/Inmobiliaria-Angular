import { SolicitudService } from 'src/app/services/solicitud.service';
import { Solicitud } from 'src/app/models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TiposPropiedades } from 'src/app/enums/tipos-propiedades.enum';
import { Casa } from 'src/app/models/casa.model';
import { Provincia, ProvinciaM } from 'src/app/models/provincia.model';
import { CasaService } from 'src/app/services/casa.service';
import { NotificationsToastrService } from 'src/app/services/notifications-toastr.service';
declare var activee: any;
// Declaro las variables de jQuery
declare var jQuery: any;
declare var $: any;
declare var myExtObject: any;
declare var webGlObject: any;
@Component({
  selector: 'app-editar-solicitud-cms',
  templateUrl: './editar-solicitud-cms.component.html',
  styleUrls: ['./editar-solicitud-cms.component.css']
})
export class EditarSolicitudCmsComponent implements OnInit {
  provincia: Provincia;
  id!: string;
  solicitud!: Solicitud;
  showEspecial = false;
  isLoading = false;
  listadoProvincias: ProvinciaM[];
  listadoMunicipios: string[] = [];
  currentP: string = 'Provincia';
  currentM: string = 'Municipio';
  formData: FormData = new FormData();
  solicitudForm!: FormGroup;
  t1: string = '';
  urls: any[] = [];
  @ViewChild('multipleImages', { static: false })
  multipleImages!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private solicitudService:SolicitudService,
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
    this.solicitudForm = this.formBuilder.group({
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

    this.getSolicitudById();
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
    console.log(this.solicitudForm);
    this.isLoading = true;
    this.clearFormData();
    this.verificarTipoDePropiedad();

    this.formData.append('title', this.solicitudForm?.get('title')?.value);
    this.formData.append('nombre', this.solicitudForm?.get('nombre')?.value);
    this.formData.append(
      'apellidos',
      this.solicitudForm?.get('apellidos')?.value
    );
    this.formData.append(
      'numTelefonoPropietario',
      this.solicitudForm?.get('numTelefonoPropietario')?.value
    );
    this.formData.append(
      'localidad',
      this.solicitudForm?.get('localidad')?.value
    );
    this.formData.append('precio', this.solicitudForm?.get('precio')?.value);
    this.formData.append(
      'cantBannos',
      this.solicitudForm?.get('bannos')?.value
    );
    this.formData.append(
      'cantCuartos',
      this.solicitudForm?.get('cuartos')?.value
    );
    this.formData.append(
      'tieneGaraje',
      this.solicitudForm?.get('garaje')?.value
    );
    this.formData.append('tienePatio', this.solicitudForm?.get('patio')?.value);
    this.formData.append(
      'tieneCarpoch',
      this.solicitudForm?.get('carpoch')?.value
    );
    this.formData.append(
      'description',
      this.solicitudForm?.get('descripcion')?.value
    );
    this.formData.append('municipio', this.currentM);
    this.formData.append('provincia', this.currentP);

    this.solicitudService.updateSolicitud(this.id,this.formData).subscribe({
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
    if (this.solicitudForm?.get('apartamento')?.value) {
      this.formData.append('tipoPropiedad', TiposPropiedades.APARTAMENTO);
    } else if (this.solicitudForm?.get('biplanta')?.value) {
      this.formData.append('tipoPropiedad', TiposPropiedades.BIPLANTA);
    } else if (this.solicitudForm?.get('casaindependiente')?.value) {
      this.formData.append(
        'tipoPropiedad',
        TiposPropiedades.CASA_INDEPENDIENTE
      );
    } else if (this.solicitudForm?.get('casasemiindependiente')?.value) {
      this.formData.append(
        'tipoPropiedad',
        TiposPropiedades.CASA_SEMI_INDEPENDIENTE
      );
    } else {
      //falta hacer esta parte
      this.formData.append(
        'tipoPropiedad',
        this.solicitudForm?.get('especial')?.value
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
    this.solicitudForm.get(id)?.setValue(false);
  }
  get getControl() {
    return this.solicitudForm.controls;
  }

  getSolicitudById() {
    this.solicitudService.getSolicitudById(this.id).subscribe({
      next: (res) => {
        this.solicitud = res.solicitud;
        console.log(this.solicitud);
        console.log(this.solicitud.img);
        this.loadFormData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  //carga los datos de la solicitud al form
  loadFormData() {
    this.solicitudForm?.get('title')?.setValue(this.solicitud.title);
    this.solicitudForm?.get('localidad')?.setValue(this.solicitud.localidad);
    this.solicitudForm?.get('nombre')?.setValue(this.solicitud.nombre);
    this.solicitudForm?.get('apellidos')?.setValue(this.solicitud.apellidos);
    this.solicitudForm
      ?.get('numTelefonoPropietario')
      ?.setValue(this.solicitud.numTelefonoPropietario);
    this.solicitudForm?.get('precio')?.setValue(this.solicitud.precio);
    this.solicitudForm?.get('bannos')?.setValue(this.solicitud.cantBannos);
    this.solicitudForm?.get('cuartos')?.setValue(this.solicitud.cantCuartos);
    this.solicitudForm?.get('garaje')?.setValue(this.solicitud.tieneGaraje);
    this.solicitudForm?.get('patio')?.setValue(this.solicitud.tienePatio);
    this.solicitudForm?.get('carpoch')?.setValue(this.solicitud.tieneCarpoch);
    this.solicitudForm?.get('descripcion')?.setValue(this.solicitud.description);
    this.currentM = this.solicitud.municipio;
    this.currentP = this.solicitud.provincia;

    if (this.solicitud.tipoPropiedad === TiposPropiedades.APARTAMENTO) {
      this.solicitudForm?.get('apartamento')?.setValue(true);
    } else if (this.solicitud.tipoPropiedad === TiposPropiedades.BIPLANTA) {
      this.solicitudForm?.get('biplanta')?.setValue(true);
    } else if (
      this.solicitud.tipoPropiedad === TiposPropiedades.CASA_INDEPENDIENTE
    ) {
      this.solicitudForm?.get('casaindependiente')?.setValue(true);
    } else if (
      this.solicitud.tipoPropiedad === TiposPropiedades.CASA_SEMI_INDEPENDIENTE
    ) {
      this.solicitudForm?.get('casasemiindependiente')?.setValue(true);
    } else {
      this.solicitudForm?.get('otro')?.setValue(true);
      this.showEspecial = true;
      this.solicitudForm?.get('especial')?.setValue(this.solicitud.tipoPropiedad);

    }
    this.solicitud.img.forEach((url) => {
      this.urls.push(url);
    });
    this.t1 = `Se seleccionaron ${this.solicitud.img.length} imágenes.`;
  }
}
