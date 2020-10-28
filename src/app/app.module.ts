import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { LoginComponent } from './Login/login/login.component';
import { Shared } from './Models/common-data';
import { EncrDecrService } from './Services/encr-decr.service';
import { CaseComponent } from './case/case.component';
import{TranslateModule,TranslateLoader} from '@ngx-translate/core';
import{TranslateHttpLoader} from '@ngx-translate/http-loader';
import { transition } from '@angular/animations';
export function HttploaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');//TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CaseComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttploaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [EncrDecrService,Shared],
  bootstrap: [AppComponent]
})
export class AppModule { }
