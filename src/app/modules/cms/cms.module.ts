import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, } from '@ng-bootstrap/ng-bootstrap';

import { CmsRoutingModule } from './cms-routing.module';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CardCmsComponent } from './listado-casa-cms/card-cms/card-cms.component';
import { ListadoCasaCmsComponent } from './listado-casa-cms/listado-casa-cms.component';
import { DetallesCasaCmsComponent } from './detalles-casa-cms/detalles-casa-cms.component';
import { AddSolicitudCmsComponent } from './add-solicitud-cms/add-solicitud-cms.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { DetallesUserComponent } from './detalles-user/detalles-user.component';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';

@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    AcercaComponent,
    ContactoComponent,
    ListadoCasaCmsComponent,
    CardCmsComponent,
    DetallesCasaCmsComponent,
    AddSolicitudCmsComponent,
    DetallesUserComponent,
    ListadoSolicitudesComponent,
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CmsModule {}
