import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { CmsComponent } from './layouts/cms/cms.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule } from "ngx-ui-loader";
@NgModule({
  declarations: [AppComponent, DashboardComponent, CmsComponent, AuthComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxUiLoaderModule,NgxUiLoaderRouterModule,NgxUiLoaderHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
