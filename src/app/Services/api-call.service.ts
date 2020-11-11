import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { EncrDecrService } from '../Services/encr-decr.service';
import { Request } from 'selenium-webdriver/http';
import * as CryptoJS from 'crypto-js';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;chatset=UTF-8' })  
  };
  
@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient, private EncrDecr: EncrDecrService) { }
  public getIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  get(url: string, strParams: string)
  {
    let params = new HttpParams().set("params", strParams);
    return this.http.get(url, {params});
  }
  getNew(url: string, params: HttpParams)
  {
    return this.http.get(url, {params:params});
  }
  post(url: string,strParams: string): Observable<any>
  {
    let params = url + '?params=' + strParams;
    return this.http.post(params , httpOptions)
  }  
  getStrings(url: string): Observable<any> 
  {   
    return this.http.get<any>(url) 
  }
  
  insert_Languagestring(yoururl: string,partnerid:number,string_code:string,string_name:string,groupid:number,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    
    //const data1 = {'partnerid':partnerid,'check_typeid': check_typeid};

    let str = "{\"partnerid\":"+ partnerid +",\"stringcode\":\""+ string_code + "\",\"stringname\":\""+ string_name + "\",\"groupid\":"+groupid+"}";
    var ciphertext = CryptoJS.AES.encrypt(str, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(yoururl, msg,config);

  }

  
 


}
