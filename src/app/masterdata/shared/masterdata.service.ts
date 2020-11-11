import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';


const headers = new HttpHeaders()
        .set("Content-Type", "application/json");
 
@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
   
  constructor(private http: HttpClient) { }
  get(url: string): Observable<any>
  {
    
    
    return this.http.get(url);
  }

  

  getVisacategoryList(yoururl: string,partnerid:number): Observable<any>
  {
   
    const params = new HttpParams()
     .set('params','{"partner_id":'+partnerid+'}')
  return  this.http.get<any>(yoururl,{headers:headers, params: params});

 
  }

  

  CheckDuplicatevisa_category(yoururl: string,partnerid:number,visa_category_name:string,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    let str = "{\"partner_id\":"+ partnerid +",\"visa_category_name\":\""+ visa_category_name + "\"}";
    var ciphertext = CryptoJS.AES.encrypt(str, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';
    
    console.log(AuthKey);
    console.log(msg);
    // const params = new HttpParams()
    //  .set('params','{"partner_id":'+partnerid+',"visa_category_name":"'+visa_category_name+'"}')
    const params = new HttpParams().set("params", msg);
  return  this.http.get<any>(yoururl,{headers:headers, params: params});

 
  }


  CheckDuplicatechecktype(yoururl: string,partnerid:number,check_type_name:string,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    let str = "{\"partner_id\":"+ partnerid +",\"check_type_name\":\""+ check_type_name + "\"}";
    var ciphertext = CryptoJS.AES.encrypt(str, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';
    
    console.log(AuthKey);
    console.log(msg);
    // const params = new HttpParams()
    //  .set('params','{"partner_id":'+partnerid+',"visa_category_name":"'+visa_category_name+'"}')
    const params = new HttpParams().set("params", msg);
  return  this.http.get<any>(yoururl,{headers:headers, params: params});

 
  }

//   CheckDuplicatevisa_category(yoururl: string,partnerid:number,visa_category_name:string) : Observable<any>{
//     const params = new HttpParams().set('params', '{"partner_id":'+partnerid+',"visa_category_name":'+visa_category_name+'}');
//     return  this.http.get<any>(yoururl,{params: params});
// }

  create(yoururl: string,data): Observable<any>
  {
    return this.http.post(yoururl, data);
  }

  Delete(yoururl: string,data,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    //let params = new HttpParams();
    //params = params.append('visa_category_id', data);
    // const  httpBody = JSON.stringify({visa_category_id:data});
     
    // return this.http.post(yoururl, httpBody, this.getArgHeaders());

    // return this.http.post(yoururl, '', {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }),
    //   params: params,
    //   responseType: "json"
    // })

    //let data1 = {'visa_category_id': data};
   // const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    //let options = new RequestOptions({headers: headers});
    //return this.http.post(yoururl, JSON.stringify({"visa_category_id": data}));
   //const data11 = {'visa_category_id': data};
    let data1 = "{\"visa_category_id\":"+ data +"}";
    var ciphertext = CryptoJS.AES.encrypt(data1, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';
  
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(yoururl, msg,config);

  }
  Delete_checktype(yoururl: string,data,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    
    // const data1 = {'check_type_id': data};
    // const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    // return this.http.post(yoururl, data1,config);
    let data1 = "{\"check_type_id\":"+ data +"}";
    var ciphertext = CryptoJS.AES.encrypt(data1, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';
  
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(yoururl, msg,config);

  }

  insert_amber(yoururl: string,partnerid:number,check_typeid:number,AuthKey:string,SessionId:number,SessionToken:string): Observable<any>
  {
    
    //const data1 = {'partnerid':partnerid,'check_typeid': check_typeid};

    let data1 = "{\"partnerid\":"+ partnerid +",\"check_typeid\":"+ check_typeid +"}";
    var ciphertext = CryptoJS.AES.encrypt(data1, AuthKey).toString();
    let msg = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(SessionId) + '\","SessionToken":\"' + encodeURIComponent(SessionToken) + '\"}';

    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(yoururl, msg,config);

  }

  private getArgHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
}




 
  }
  
  

