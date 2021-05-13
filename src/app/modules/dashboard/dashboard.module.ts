import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdicionarCasaComponent } from './adicionar-casa/adicionar-casa.component';
import { EditarCasaComponent } from './editar-casa/editar-casa.component';
import { ListadoCasaComponent } from './listado-casa/listado-casa.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    AdicionarCasaComponent,
    EditarCasaComponent,
    ListadoCasaComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class DashboardModule { }
