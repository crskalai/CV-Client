import { Injectable } from '@angular/core';
import { Shared } from '../Models/common-data';
import { ApiCallService } from '../Services/api-call.service';

@Injectable({
  providedIn: 'root'
})
export class Authkey {
    constructor(private shared:Shared,private apiService: ApiCallService) { }
    Authkey(session_id,session_token) {
    let str = "{\"session_id\":"+ session_id +",\"session_token\":\""+ session_token + "\"}";
  
    let url = this.shared.ApiURL + "getvalue";
  
    this.apiService.get(url, str).subscribe(data => {
      console.log(data);
     this.shared.AuthKey=data['auth_key'];
     console.log(this.shared.AuthKey);
    //   const allList = JSON.stringify(data);
    //   var alljObj = JSON.parse(allList);
    //   console.log(alljObj);
    //    var allData = CryptoJS.AES.decrypt(alljObj.Response, '8080808080808080').toString(CryptoJS.enc.Utf8);  
    //    console.log(allData);

      
    });
}
}