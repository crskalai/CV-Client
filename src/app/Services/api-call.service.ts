import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs/index";
import { EncrDecrService } from '../Services/encr-decr.service';
import { Request } from 'selenium-webdriver/http';

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
  post(url: string,strParams: string): Observable<any>
  {
    let params = url + '?params=' + strParams;
    return this.http.post(params , httpOptions)
  }  
  getStrings(url: string): Observable<any> 
  {   
    return this.http.get<any>(url) 
  }
}
