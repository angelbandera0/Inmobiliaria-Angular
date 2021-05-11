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
  { path: 'editarcasa', component: EditarCasaComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
