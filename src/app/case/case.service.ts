import { Injectable } from '@angular/core';
import {ApiCallService} from './../Services/api-call.service';
import {Shared} from '../Models/common-data';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CaseService {

  constructor(private apiCall:ApiCallService,private ArgHeader:Shared) { }
  getCheckliSt(id,partner,type):Observable<any>{
    const params = new HttpParams().append("id","1").append("partner_id","2233").append("list_type","1");
    return <any>this.apiCall.getNew(this.ArgHeader.ApiURL+'getCheckList',params);
  }
}
