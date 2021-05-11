import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { ShopComponent } from './shop/shop.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [ShopComponent, HomeComponent],
  imports: [CommonModule, CmsRoutingModule],
})
export class CmsModule {}
