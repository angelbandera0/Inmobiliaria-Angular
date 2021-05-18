import { ContactoComponent } from './contacto/contacto.component';
import { AcercaComponent } from './acerca/acerca.component';
import { DetallesCasaComponent } from './detalles-casa/detalles-casa.component';
import { EditarCasaComponent } from './editar-casa/editar-casa.component';
import { ListadoCasaComponent } from './listado-casa/listado-casa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarCasaComponent } from './adicionar-casa/adicionar-casa.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'addcasa', component: AdicionarCasaComponent },
  { path: 'listadocasa', component: ListadoCasaComponent },
  { path: 'editarcasa/:id', component: EditarCasaComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'contactos', component: ContactoComponent },
  { path: "detallescasa/:id", component: DetallesCasaComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
