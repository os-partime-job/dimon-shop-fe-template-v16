import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './core/default-layout/default-layout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginComponent } from './modules/auth/login/login.component';
import { SharedAppModule } from './core/shared/shared.module';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
// import { FeatureGuard } from './core/permission/guards/feature.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthInterceptor } from './core/shared/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './modules/home/home.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginV3Component } from './modules/login-v3/login-v3.component';
import { IntroductionComponent } from './modules/default-page/introduction/introduction.component';
import {ToastrModule} from "ngx-toastr";
import { PriceDimondTableComponent } from './modules/default-page/price-dimond-table/price-dimond-table.component';
import { MeasureJewelrySizeComponent } from './modules/default-page/measure-jewelry-size/measure-jewelry-size.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { CartComponent } from './modules/cart/cart.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import {CommonModule} from "@angular/common";
import { HeaderComponent } from './modules/header/header.component';
import { FileUploadComponent } from './modules/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomeComponent,
    LoginV3Component,
    IntroductionComponent,
    PriceDimondTableComponent,
    MeasureJewelrySizeComponent,
    AddProductComponent,
    CartComponent,
    UserProfileComponent,
    HeaderComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultLayoutModule,
    DashboardModule,
    SharedAppModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    OAuthModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 150000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),

  ],
  providers: [
    // FeatureGuard,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
