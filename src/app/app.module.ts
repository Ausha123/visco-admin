import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ShareModule} from "./modules/share/share.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpManagerInterceptor} from "./modules/share/interceptors/http-manager.interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpManagerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
