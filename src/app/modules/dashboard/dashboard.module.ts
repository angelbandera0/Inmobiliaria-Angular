import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdicionarCasaComponent } from './adicionar-casa/adicionar-casa.component';
import { EditarCasaComponent } from './editar-casa/editar-casa.component';
import { ListadoCasaComponent } from './listado-casa/listado-casa.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { DetallesCasaComponent } from './detalles-casa/detalles-casa.component';
import { CardComponent } from './listado-casa/card/card.component';
import { SearchComponent } from './listado-casa/search/search.component';
import { ListadoSolicitudesDashComponent } from './listado-solicitudes-dash/listado-solicitudes-dash.component';
import { ListadoCitasDashComponent } from './listado-citas-dash/listado-citas-dash.component';
import { DetallesCitaComponent } from './detalles-cita/detalles-cita.component';
import { DetallesSolicitudDashComponent } from './detalles-solicitud-dash/detalles-solicitud-dash.component';
import { ListadoVentasDashComponent } from './listado-ventas-dash/listado-ventas-dash.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    AdicionarCasaComponent,
    EditarCasaComponent,ListadoCasaComponent,
    DetallesCasaComponent,
    CardComponent,
    SearchComponent,
    ListadoSolicitudesDashComponent,
    ListadoCitasDashComponent,
    DetallesCitaComponent,
    DetallesSolicitudDashComponent,
    ListadoVentasDashComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbCarouselModule,
    DashboardRoutingModule,FormsModule,ReactiveFormsModule
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
