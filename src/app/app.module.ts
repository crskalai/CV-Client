import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { LoginComponent } from './Login/login/login.component';
import { Shared } from './Models/common-data';
import { EncrDecrService } from './Services/encr-decr.service';

import{TranslateModule,TranslateLoader} from '@ngx-translate/core';
import{TranslateHttpLoader} from '@ngx-translate/http-loader';
import { transition } from '@angular/animations';
<<<<<<< HEAD
<<<<<<< HEAD
import { MasterdataComponent } from './masterdata/masterdata.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { SafeHtmlPipe } from '../app/Pipes/SafeHtmlPipe';
import { CountryconfigComponent } from './countryconfig/countryconfig.component';
=======
import { CaseListComponent } from './case/case-list/case-list.component';
import { CaseDetailComponent } from './case/case-detail/case-detail.component';
import {UtilityJqueryService } from './utility/utility-jquery.service';
>>>>>>> refs/remotes/origin/main
=======
import { CaseListComponent } from './case/case-list/case-list.component';
import { CaseDetailComponent } from './case/case-detail/case-detail.component';
import {UtilityJqueryService } from './utility/utility-jquery.service';
>>>>>>> 033815aa62027b3fce36e6534d700ffd3c3be452
export function HttploaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');//TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    CaseComponent,
    MasterdataComponent,SafeHtmlPipe, CountryconfigComponent   
=======
    CaseListComponent,
    CaseDetailComponent
>>>>>>> refs/remotes/origin/main
=======
    CaseListComponent,
    CaseDetailComponent
>>>>>>> 033815aa62027b3fce36e6534d700ffd3c3be452
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    AppRoutingModule,NgxTrimDirectiveModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttploaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [EncrDecrService,Shared,UtilityJqueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
