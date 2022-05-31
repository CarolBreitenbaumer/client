import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectListItemComponent } from './subject-list-item/subject-list-item.component';
import {SubjectStoreService} from "./shared/subject-store.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SubjectFormComponent } from './subject-form/subject-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {SearchComponent} from "./search/search.component";
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID } from '@angular/core';
import { AppointmentListItemComponent } from './appointment-list-item/appointment-list-item.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { MessageFormComponent } from './message-form/message-form.component';
import {MessageStoreService} from "./shared/message-store.service";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent,
    SubjectListItemComponent,
    HomeComponent,
    SubjectFormComponent,
    LoginComponent,
    SearchComponent,
    AppointmentListItemComponent,
    SubjectDetailComponent,
    MessageFormComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [SubjectStoreService, MessageStoreService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'de'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
