import { DetallesUserComponent } from './detalles-user/detalles-user.component';
import { ListadoSolicitudesComponent } from './listado-solicitudes/listado-solicitudes.component';
import { AddSolicitudCmsComponent } from './add-solicitud-cms/add-solicitud-cms.component';
import { ShopComponent } from './shop/shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercaComponent } from './acerca/acerca.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ListadoCasaCmsComponent } from './listado-casa-cms/listado-casa-cms.component';
import { DetallesCasaCmsComponent } from './detalles-casa-cms/detalles-casa-cms.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'contactos', component: ContactoComponent },
  { path: 'listadocasa', component: ListadoCasaCmsComponent },
  { path: 'detallescasa/:id', component: DetallesCasaCmsComponent },
  { path: 'detallesuser/:id', component: DetallesUserComponent },
  { path: 'addsolicitud', component:AddSolicitudCmsComponent},
  { path: 'listadosolicitud', component:ListadoSolicitudesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
