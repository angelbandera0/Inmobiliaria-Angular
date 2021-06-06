import { ListadoVentasDashComponent } from './listado-ventas-dash/listado-ventas-dash.component';
import { DetallesSolicitudDashComponent } from './detalles-solicitud-dash/detalles-solicitud-dash.component';
import { DetallesCitaComponent } from './detalles-cita/detalles-cita.component';
import { ListadoCitasDashComponent } from './listado-citas-dash/listado-citas-dash.component';
import { ListadoSolicitudesDashComponent } from './listado-solicitudes-dash/listado-solicitudes-dash.component';
import { DetallesCasaComponent } from './detalles-casa/detalles-casa.component';
import { EditarCasaComponent } from './editar-casa/editar-casa.component';
import { ListadoCasaComponent } from './listado-casa/listado-casa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarCasaComponent } from './adicionar-casa/adicionar-casa.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AdminGuard] },
  {
    path: 'addcasa',
    component: AdicionarCasaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listadocasa',
    component: ListadoCasaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'editarcasa/:id',
    component: EditarCasaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'detallescasa/:id',
    component: DetallesCasaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listadosolicitudes',
    component: ListadoSolicitudesDashComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'detallessolicitud/:id',
    component: DetallesSolicitudDashComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listadocitas',
    component: ListadoCitasDashComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'detallescita/:id',
    component: DetallesCitaComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'listadoventas',
    component: ListadoVentasDashComponent,
    canActivate: [AdminGuard],
  },

  // { path: '**', redirectTo: '/error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
