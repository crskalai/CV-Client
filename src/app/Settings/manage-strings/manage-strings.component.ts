import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { Shared } from '../../Models/common-data';
import { ApiCallService } from '../../Services/api-call.service';
import{TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import {UtilityJqueryService } from '../../utility/utility-jquery.service';

@Component({
  selector: 'app-manage-strings',
  templateUrl: './manage-strings.component.html',
  styleUrls: ['./manage-strings.component.css']
})
export class ManageStringsComponent implements OnInit {
  stringList : any;
  GroupNames = ["","Common","Menu","Mission","Country","VAC","Role","Language","Status"];
  stringName = "";
  stringCode = "";
  groupId = 0;
  ddlGroup = 0;
  emptyMsg = 0;
  MenuId = 21;
  isAdd = 1;
  searchText = "";
  constructor(public jsutility:UtilityJqueryService,public translate:TranslateService,private router: Router,private shared: Shared, private apiService: ApiCallService) { }

  ngOnInit(): void {
    
     this.isValidSession();
     this.getAllStrings();    
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
       if(allData.response == 1)
       {
         this.router.navigate(['/login']);
       }
      });
  }
  ClearValues()
  {
    this.stringCode = "";
    this.stringName = "";
  }
  AddString()
  {
    let flag = 0;
    console.log(this.stringCode + "=" + this.stringName);
    
    if(this.stringCode == "")
    {
      this.emptyMsg = 1;
      flag = 1;
    }
    else if(this.stringName == "")
    {
      this.emptyMsg = 2;
      flag = 1;
    }
    else
    {
      this.emptyMsg = 0;
      flag = 0;
    }
    if(flag == 0)
    {
      /*let url = this.shared.ApiURL + "addstring";
   // let str = "{\"params={\"stringCode\":\"" + this.stringCode +"\",\"stringName\":\""+ this.stringName + "\",\"groupId\":" + this.ddlGroup +"}";
      let str = "{\"stringCode\":\"" + this.stringCode +"\",\"stringName\":\""+ this.stringName + "\",\"groupId\":1,\"pId\":" + this.shared.PartnerId+ ",\"lId\":" + this.shared.LanguageId +"}";
       console.log(str);
      this.apiService.post(url, str).subscribe(data => {
      console.log(data);      
      });
      this.getAllStrings();*/

  
      let url = this.shared.ApiURL + "addstring";
      let str = "{\"stringCode\":\"" + this.stringCode +"\",\"stringName\":\""+ this.stringName + "\",\"groupId\":\"1\",\"pId\":\"" + this.shared.PartnerId+ "\",\"lId\":\"" + this.shared.LanguageId + "\",\"session_id\":\""+ this.shared.SessionId + "\",\"session_token\":\""+ this.shared.SessionToken + "\"}";
      console.log(str);
      this.apiService.post(url, str).subscribe(data => {
        console.log("data", data);  
        this.ClearValues();
        if(data == true)    
        {
          this.getAllStrings();
        }
        else
        {
          alert("Duplicate String Code");
        }
        });
    }  
  }

  getAllStrings()
  {
    let str = "{\"session_id\":\""+ this.shared.SessionId +"\",\"session_token\":\""+ this.shared.SessionToken + "\"}";    
    let url = this.shared.ApiURL + "managestrings";
    // this.apiService.getStrings(url).subscribe(data => {
      this.apiService.get(url, str).subscribe(data => {
        if(data == false)
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.stringList = data;          
        }      
    });
  }
  ngAfterViewInit(){

    this.jsutility.windowResize();

  }
}
