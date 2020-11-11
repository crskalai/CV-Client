import { Injectable } from '@angular/core';
import { Shared } from '../Models/common-data';
import { ApiCallService } from '../Services/api-call.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/index";
const headers = new HttpHeaders()
  .set("Content-Type", "application/json");
@Injectable({
    providedIn: 'root'
  })
  export class Languagestring {
      constructor(private shared:Shared,private apiService: ApiCallService,private Shared:Shared,private http: HttpClient) { }
      insert_Languagestring(string_code:string,string_name:string,groupid:number)
      {
        
        let url = this.Shared.ApiURL + "insertLanguagestring";
   this.apiService.insert_Languagestring(url,this.Shared.PartnerId,string_code,string_name,groupid,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
   .subscribe(
     response => {
   
      
     },
     error => {
       console.log(error);
     });
    
      }
    //   Get_Languagestring(groupid:number)
    //   {
    //     let url = this.Shared.ApiURL + "GetLanguagestring";
    //     this.apiService.Get_Languagestring(url, groupid,this.Shared.LanguageId).subscribe(data => {
    //         return data;
    //     });

        
    //   }
      Get_Languagestring(yoururl: string,groupid:number,languageid:number): Observable<any>
      {
        let str = "{\"groupid\":"+ groupid +",\"languageid\":\""+ languageid + "\"}";
        const params = new HttpParams()
         .set('params',str)
      return  this.http.get<any>(yoururl,{headers:headers, params: params});
    
     
      }

    
  }