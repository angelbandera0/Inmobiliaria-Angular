import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './cms/header/header.component';
import { FooterComponent } from './cms/footer/footer.component';
import { HeaderDashComponent } from './dashboard/header-dash/header-dash.component';
import { FooterDashComponent } from './dashboard/footer-dash/footer-dash.component';
import { PaginationComponent } from './comun/pagination/pagination.component';
import { PaginaAnteriorComponent } from './comun/pagina-anterior/pagina-anterior.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderDashComponent,
    FooterDashComponent,
    PaginationComponent,
    PaginaAnteriorComponent,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderDashComponent,
    FooterDashComponent,
    PaginationComponent,
    PaginaAnteriorComponent,

    ],
  imports: [
    CommonModule,SharedRoutingModule
  ]
})
export class SharedModule { }
