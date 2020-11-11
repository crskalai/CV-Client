import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Shared } from '../../Models/common-data';
import { ApiCallService } from '../../Services/api-call.service';
import{TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import {UtilityJqueryService } from '../../utility/utility-jquery.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  ReqAcc = ["","All","Mission/Country","Mission/Country/VAC"];
  AssCase = ["No","Yes"];
  MenuId = 22;
  isAdd = 1;
  isEdit = 1;
  isDelete = 1;
  Roles: any;
  Modules: any;
  constructor(public jsutility:UtilityJqueryService,public translate:TranslateService,private router: Router,private shared: Shared, private apiService: ApiCallService) { }

  ngOnInit(): void {
    this.isValidSession();
    this.getRoles();
  }
  isValidSession()
  {
      // let str = "{\"session_id\":\""+ this.shared.SessionId +"\",\"session_token\":\""+ this.shared.SessionToken + "\"}";
      let str = "{\"session_id\":\""+ this.shared.SessionId + "\",\"menu_id\":\"" + this.MenuId + "\",\"session_token\":\""+ this.shared.SessionToken + "\"}";
      this.apiService.get(this.shared.ApiURL + "permissions", str).subscribe(data => {
      console.log(data);  
      const allList = JSON.stringify(data);
      var allData = JSON.parse(allList);   
      console.log(allData.response);  
      this.isAdd = allData.isAdd;
      this.isEdit = allData.isEdit;
      this.isDelete = allData.isDelete;
       if(allData.response == 1)
       {
         this.router.navigate(['/login']);
       }
      });
  }
  getRoles()
  {
    let str = "{\"session_id\":\""+ this.shared.SessionId +"\",\"session_token\":\""+ this.shared.SessionToken + "\"}";    
    let url = this.shared.ApiURL + "getRoles";
    // this.apiService.getStrings(url).subscribe(data => {
      this.apiService.get(url, str).subscribe(data => {
        console.log(data);
        const allList = JSON.stringify(data);
      var allData = JSON.parse(allList);
      console.log(allData);
        if(data == false)
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.Roles = allData.Role; 
          this.Modules = allData.Modules;         
        }    
    });
  }
  ngAfterViewInit(){
    this.jsutility.windowResize();
  }
}
