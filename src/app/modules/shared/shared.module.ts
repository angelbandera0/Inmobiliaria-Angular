import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './cms/header/header.component';
import { FooterComponent } from './cms/footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ],
  imports: [
    CommonModule,SharedRoutingModule
  ]
})
export class SharedModule { }
