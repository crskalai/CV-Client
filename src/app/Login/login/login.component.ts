import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiCallService } from '../../Services/api-call.service';
import { EncrDecrService } from '../../Services/encr-decr.service';
import { Shared } from '../../Models/common-data';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import * as CryptoJS from 'crypto-js';
//import { API } from '../../Models/API';
import { Dictionary } from 'lodash';
import{TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = "";
  public password = "";
  public partnercode = "";
  public isBusy = "1";
  public msg = 0;
  public errMsg = "";
  public emptyMsg = 0;
  public username1 = "";
  public newpassword = "";
  public confirmpassword = "";
  isChangePass = 0;
  ipAddress:string;  
  public userId = 0;
  isDisabled: boolean;
  constructor(public translate:TranslateService,private router: Router, private apiService: ApiCallService, private EncrDecr: EncrDecrService, private shared: Shared) { }

  ngOnInit() {
    this.isDisabled = false;
    this.ClearValues();
    this.getIP();
    // var data = "Object {\"mission_id\":1,\"partner_id\":1,\"mission_name\":\"UK\"}";
    // var allList = JSON.stringify(data);
    // var alljObj = JSON.parse(allList);
    // console.log(alljObj.mission_id);
    // this.api.mission_id = alljObj.mission_id;
    // this.api.mission_name = alljObj.mission_name;
    // console.log(this.api);
  }
  ClearValues()
  {
    this.partnercode = "";
    this.username = "";
    this.password = "";
    //this.oldpassword = "";
    this.newpassword = "";
    this.confirmpassword = "";
  }
  getIP()  
  {  
    this.apiService.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip; 
    });  
  } 
  onSubmit1()
  {
    this.username = "admin";
    this.password = "zxc";
    this.partnercode = "A2233";

    let str = "{\"user_name\":\""+ this.username +"\",\"password\":\""+ this.password + "\",\"partnerCode\":\"" + this.partnercode + "\",\"ipAdd\":\""+ this.ipAddress+ "\"}";
      //var msg = this.EncrDecr.set('8080808080808080',str);
      var ciphertext = CryptoJS.AES.encrypt(str, '8080808080808080').toString();
      let url = this.shared.ApiURL + "login";
      let msg = "{\"Request\":\"" + encodeURIComponent(ciphertext) + "\"}";
      this.apiService.get(url, msg).subscribe(data => {
        console.log(data);
        // var jData = JSON.stringify(data);
        // console.log(jData);
        const allList = JSON.stringify(data);
        var alljObj = JSON.parse(allList);
        console.log(alljObj);
         var allData = CryptoJS.AES.decrypt(alljObj.Response, '8080808080808080').toString(CryptoJS.enc.Utf8);  
         console.log(allData);

        //const allList = JSON.stringify(allData);
        //var alljObj = JSON.parse(allList);
        //console.log(allList);
      });
  }
  onChangePassword()
  {
    // console.log(this.newpassword ,"=",this.confirmpassword);
    //   this.newpassword = this.newpassword.trim();
    //   this.confirmpassword = this.confirmpassword.trim();
    //   if(this.newpassword == this.confirmpassword)
    //   {
        
    //     var ciphertext = CryptoJS.AES.encrypt(this.newpassword, '8080808080808080').toString();
    //     let url = "http://localhost:8433/api/updatepassword";
    //    this.apiService.changPass(url,this.userId,this.newpassword).subscribe(data => {
    //       console.log(data);
    //       var allList = JSON.stringify(data);
    //       var alljObj = JSON.parse(allList);
    //       if(alljObj.Flag == 1)
    //       {
    //         this.errMsg = "Generate new Password not the latest 5";
    //         this.isChangePass = 1;
    //       }
    //       else
    //       {
    //         this.isChangePass = 0;
    //         this.msg = 0;
    //         this.username = "";
    //         this.password = "";
    //         this.partnercode = "";
    //         this.errMsg = "";
    //       }
    //   });
    //   }
    //   else
    //   {
    //     this.newpassword = "";
    //     this.confirmpassword = "";
    //     alert("New password & Confirm password not matching");
    //   }
  }
  onSubmit()
  {    
    if(this.isChangePass == 0)
    {
    let flag = 0;
    this.partnercode = this.partnercode.trim();
    this.username = this.username.trim();
    this.password = this.password.trim();
    console.log(this.partnercode , "=" , this.username , "=" , this.password);
    if(this.partnercode == "")
    {
      this.emptyMsg = 1;
      flag = 1;
    }
    else if(this.username == "")
    {
      this.emptyMsg = 2;
      flag = 1;
    }
    else if(this.password == "")
    {
      this.emptyMsg = 3;
      flag = 1;
    }
    else
    {
      this.emptyMsg = 0;
      flag = 0;
    }
    if(flag == 0)
    {  
      let str = "{\"user_name\":\""+ this.username +"\",\"password\":\""+ this.password + "\",\"partnerCode\":\"" + this.partnercode + "\",\"ipAdd\":\""+ this.ipAddress+ "\"}";
      var ciphertext = CryptoJS.AES.encrypt(str, '8080808080808080').toString();
      let url = this.shared.ApiURL + "login";
      let msg = "{\"Request\":\"" + encodeURIComponent(ciphertext) + "\"}";
      this.apiService.get(url, msg).subscribe(data => {
      //console.log(data);

// //this.shared.MenuObj = data;
// alert("rvs");
// var allData = CryptoJS.AES.decrypt(data, '8080808080808080').toString(CryptoJS.enc.Utf8);  
// const allList = JSON.stringify(data);
// //console.log(allList);
// var alljObj = JSON.parse(allList);
// //var allDataList = <any>JSON.parse(alljObj);
        const allList = JSON.stringify(data);
        var allData = JSON.parse(allList);
        //console.log(allData);
         var alljObj1 = CryptoJS.AES.decrypt(allData.Response, '8080808080808080').toString(CryptoJS.enc.Utf8);  
         var alljObj = JSON.parse(alljObj1);
         console.log(alljObj.All);


var missionsDict:Dictionary<string>= {};
alert(alljObj.Response);
if(alljObj.Response == 0)
{ 
  this.isDisabled = false;
  this.shared.PartnerId = alljObj.All.pId;
  this.shared.LanguageId = alljObj.All.lId;
  this.shared.FullName = alljObj.All.firstName + " " + alljObj.All.lastName;
  this.shared.SessionToken = alljObj.SessionToken;
  this.shared.SessionId = alljObj.SessionId;
  this.shared.MenuObj = alljObj.Menu;
  this.shared.Roles = alljObj.Roles;
  this.shared.Missions = alljObj.Mission;
  this.shared.Country = alljObj.Country;
  this.shared.VAC = alljObj.VAC;
  // this.shared.PartnerId = alljObj.All.pId;
  // this.shared.LanguageId = alljObj.All.lId;
  // this.shared.FullName = alljObj.All.firstName + " " + alljObj.All.lastName;
  // this.shared.SessionToken = alljObj.SessionToken;
  // this.shared.SessionId = alljObj.SessionId;
  // this.shared.MenuObj = alljObj.Menu;
  //this.api = alljObj.Mission;
for(var i=0;i<alljObj.Mission.length;i++)
{
  
  this.shared.MissionsDict[alljObj.Mission[i].mission_id] = alljObj.Mission[i].mission_name;
}
//console.log(missionsDict[2]);
  this.translate.addLangs(['en','TN']);
  this.translate.setDefaultLang('en');
  this.translate.use('en'); 
//   this.translate.get('Roles').subscribe((res: string) => {
//     console.log(res);
// });
  this.router.navigate(['/case']);  
}
else
{
  this.msg = 1;
  if(alljObj.Response == 1)
  {
    if(alljObj.MaxAttempt == 1)
    {
      this.errMsg = "Invalid UserName or Password. You have made 1 unsuccessful attempt. The maximum attempts allowed for login are 3.";
    }
    if(alljObj.MaxAttempt == 2)
    {
      this.errMsg = "Invalid UserName or Password. You have made 2 unsuccessful attempts. The user will be blocked, when 3rd unsuccessful attempt.";
    }
    if(alljObj.MaxAttempt >= 3)
    {
      this.errMsg = "This username has blocked. Please contact your admin.";
    }
  }
  else if(alljObj.Response == 2)
  {
    this.errMsg = "Invalid Network";
  }
  else if(alljObj.Response == 3)
  {
    this.errMsg = "Max User Exceeded";
  }
  else if(alljObj.Response == 4)
  {
    this.errMsg = "Already Active Session";
  }
  else if(alljObj.Response == 5)
  {
    //alert(alljObj.UserId)
    this.userId = alljObj.UserId;
    this.errMsg = "Password Expired";
    this.isChangePass = 1;
  }
 }
});
  }
//end flag=0
    }
    /*else
    {
      console.log(this.password ,"=",this.confirmpassword);
      this.password = this.password.trim();
      this.confirmpassword = this.confirmpassword.trim();
      if(this.password == this.confirmpassword)
      {
        let url = "http://localhost:8433/operatorconsole/updatepassword";
       this.apiService.changPass(url,1,this.password).subscribe(data => {
          console.log(data);
          var allList = JSON.stringify(data);
          var alljObj = JSON.parse(allList);
          if(alljObj.Flag == 1)
          {
            this.errMsg = "Generate new Password not the latest 5";
            this.isChangePass = 1;
          }
          else
          {
            this.isChangePass = 0;
          }
      });
    }
    else{
      alert("New password & Confirm password not matching");
    }
    }*/
  }
}
