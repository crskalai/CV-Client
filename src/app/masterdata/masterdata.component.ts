import { Component, OnInit } from '@angular/core';
import {Visacategory,DeleteVisacategory,checktypemaster,languagestrings} from './shared/visacategory.model';
import {MasterDataService} from'./shared/masterdata.service';
import { Observable, of,combineLatest,forkJoin } from 'rxjs';
import { map,switchMap, } from 'rxjs/operators';
import { Shared } from '../Models/common-data';
import { EncrDecrService } from '../Services/encr-decr.service';
import {UtilityJqueryService } from '../utility/utility-jquery.service';
import {Authkey } from '../Authkey/Authkey';
import {Languagestring} from '../Languagestring/Languagestring';
 import * as CryptoJS from 'crypto-js';
// import{TranslateService} from '@ngx-translate/core'
import { FormGroup,FormControl,FormBuilder, FormArray,Validators,AbstractControl, ValidationErrors,AsyncValidatorFn } from "@angular/forms";
//import { Console } from 'console';
@Component({
  selector: 'app-masterdata',
  templateUrl: './masterdata.component.html',
  styleUrls: ['./masterdata.component.css']
})
export class MasterdataComponent implements OnInit {
  pro_Visacategoryarray:Visacategory[];
  pro_deletearray:DeleteVisacategory[];
  pro_checktypearray:checktypemaster[];
  visacategorysubmitted : boolean = false;
  ChecktypeSubmitted: boolean = false;
  disableButton: boolean = false;
  disableButton_checktype: boolean = false;
  partnerid : number;
  bioSection: FormGroup;
  ChecktypeSection:FormGroup;
  url:string;
  url_checktype:string;
  url_language:string;
  LN_Visacategory=[];
  constructor(private formBuilder: FormBuilder,private MasterDataService: MasterDataService,public jsutility:UtilityJqueryService,private Shared:Shared,private key:Authkey,private crypt: EncrDecrService,private LN:Languagestring) { }
  ngAfterViewInit(){

    this.jsutility.windowResize();

  }
  ngOnInit() {
    this.LN_Visacategory=[];
    this.url = this.Shared.ApiURL + "CheckDuplicatevisa_category/";
    this.url_checktype = this.Shared.ApiURL + "CheckDuplicatechecktype/";
    this.url_language = this.Shared.ApiURL + "GetLanguagestring/";
    this.pro_Visacategoryarray=[];
    this.pro_deletearray=[];
    this.pro_checktypearray=[];
    this.loadVisaCategory();
    this.loadchecktype();

    this.key.Authkey(this.Shared.SessionId,this.Shared.SessionToken);
    console.log(this.Shared);
    this.bioSection = this.formBuilder.group({
      visa_category_name: new FormControl("", { validators: Validators.required,asyncValidators:this.isValidNameNotInList(this.Shared.PartnerId,this.url)}),
      partner_id:new FormControl("", []),
      visa_category_status:new FormControl("", []),
      visa_category_id:new FormControl("", []),
      mission_id:new FormControl("", [])
    },{updateOn:'submit'});
    
    this.ChecktypeSection = this.formBuilder.group({
      check_type_name: new FormControl("", { validators: Validators.required,asyncValidators:this.isValidNameNotInList_checktype(this.Shared.PartnerId,this.url_checktype)}),
      partner_id:new FormControl("", []),
      check_type_status:new FormControl("", []),
      check_type_id:new FormControl("", []),
      mission_id:new FormControl("", [])
    },{updateOn:'submit'});
    this.bioSection.reset();
    this.ChecktypeSection.reset();
   
   
  }
  get f(): any { return this.bioSection.controls; }
  get C(): any { return this.ChecktypeSection.controls; }

  loadVisaCategory() {
 
    let url = this.Shared.ApiURL + "getallvisa_category/";  
    // this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId)
    //   .subscribe(
    //     data => {
    //       console.log(data[0]);
    //       this.pro_Visacategoryarray = data[0];
    //       console.log(this.pro_Visacategoryarray);
    //     },
    //     error => {
    //       alert("error");
    //       console.log(error);
    //     });
    // this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId)
    // .pipe(
    //   switchMap(
    //     posts => this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId)
    //       .pipe(
    //         map(users => ({ posts, users }))
    //       )
    //   )
    // )
    // .subscribe( 
    //   result => console.log('merged: ', result)
    // )

    var Get_Languagestring = this.LN.Get_Languagestring(this.url_language,11,this.Shared.LanguageId).pipe(
      map((ids: languagestrings[]) => ids.map(id => this.LN_Visacategory[""+id.string_code+""]=id.string_name) )
     
  )

  var Get_VisacategoryList = this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId)
           .pipe(
             map(users => (users))
           )

  console.log(this.LN_Visacategory);
  console.log(Get_VisacategoryList);

  forkJoin([this.LN_Visacategory,Get_VisacategoryList]).subscribe(result =>console.log(result));
    // this.LN.Get_Languagestring(this.url_language,11,this.Shared.LanguageId)
    // .pipe( switchMap(ids => this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId).pipe(
    //   map(users =>((ids: languagestrings[]) => ids.map(id => this.LN_Visacategory[id.string_code]=id.string_name)))))
    // )
    // .subscribe( 
    //   result => console.log('merged: ', this.LN_Visacategory,result)
    // )

    //   this.LN.Get_Languagestring(this.url_language,11,this.Shared.LanguageId)
    // .pipe(
    //   map((ids: languagestrings[]) => ids.map(id => this.LN_Visacategory[id.string_code]=id.string_name))
    // )
    // .subscribe( 
    //   result => console.log('merged: ', this.LN_Visacategory)
    // )

    
    
  }

  loadchecktype() {

    let url = this.Shared.ApiURL + "getallcheck_type/";
    this.MasterDataService.getVisacategoryList(url,this.Shared.PartnerId)
      .subscribe(
        data => {
          this.pro_checktypearray = data;
         
        },
        error => {
          alert("error");
          console.log(error);
        });
    
    
  }
 
Add_VisaCategory()
{
  let url = this.Shared.ApiURL + "insertvisacategory";
  this.bioSection.patchValue({partner_id:this.Shared.PartnerId,visa_category_status:1});

var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.bioSection.value), this.Shared.AuthKey).toString();

let str = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(this.Shared.SessionId) + '\","SessionToken":\"' + encodeURIComponent(this.Shared.SessionToken) + '\"}';
var jsonData = JSON.parse(str);

this.MasterDataService.create(url,jsonData)
  .subscribe(
    response => {
     
       var allData = CryptoJS.AES.decrypt(response.Response, this.Shared.AuthKey).toString(CryptoJS.enc.Utf8);  
  
       var Json_allData = JSON.parse(allData);
       this.bioSection.patchValue({visa_category_id:Json_allData['insertId']});
        this.pro_Visacategoryarray.push(this.bioSection.value);
 
     this.LN.insert_Languagestring(Json_allData['insertId'],this.bioSection.value['visa_category_name'],11);
   this.visacategorysubmitted = true;
   this.disableButton=false;
      
    },
    error => {
      console.log(error);
    });
  // this.MasterDataService.create(url,this.bioSection.value)
  // .subscribe(
  //   response => {
  //     console.log(response.insertId);
  //     this.bioSection.patchValue({visa_category_id:response.insertId});
  //     this.pro_Visacategoryarray.push(this.bioSection.value);
     
  // console.log(this.pro_Visacategoryarray);
  // console.log(this.bioSection.value);
  // this.visacategorysubmitted = true;
    
      
  //   },
  //   error => {
  //     console.log(error);
  //   });
}
checkIfFormPassesValidation(formGroup: FormGroup) {
  const syncValidationErrors = Object.keys(formGroup.controls).map(c => {
    const control = formGroup.controls[c];
    return !control.validator ? null : control.validator(control);
  }).filter(errors => !!errors);
  return combineLatest(Object.keys(formGroup.controls).map(c => {
    const control = formGroup.controls[c];
    return !control.asyncValidator ? of(null) : control.asyncValidator(control)
  })).pipe(
    map(asyncValidationErrors => {
      const hasErrors = [...syncValidationErrors, ...asyncValidationErrors.filter(errors => !!errors)].length;
      if (hasErrors) { // ensure errors display in UI...
        Object.keys(formGroup.controls).forEach(key => {
          formGroup.controls[key].markAsTouched();
          formGroup.controls[key].updateValueAndValidity();
        })
      }
      return !hasErrors;
    })).toPromise();
}
  onSubmit() {
    this.visacategorysubmitted = true;
    this.disableButton=true;
    if (this.bioSection.invalid) {
      this.disableButton=false;
      return;
    }
 
    this.checkIfFormPassesValidation(this.bioSection)
    .then(valid => {
      if (valid) {
        // proceed
       
        this.Add_VisaCategory();
      }
      else
      {
        this.disableButton=false;
      }
    });
  
 
}


isValidNameNotInList(partnerid: number,url:string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {

  return new Promise((resolve, reject) => {  
    setTimeout(() => {
    
    this.MasterDataService.CheckDuplicatevisa_category(url,partnerid,this.bioSection.controls['visa_category_name'].value,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
              .subscribe( (qty: any) => {
              
                var allData_alreadyExist = CryptoJS.AES.decrypt(qty.Response, this.Shared.AuthKey).toString(CryptoJS.enc.Utf8);  
                
               var Json_alreadyExist = JSON.parse(allData_alreadyExist);
               
                
                let test=Json_alreadyExist;
             
                  if (test.length > 0) {
                    
                     resolve({ exists: true })
                  } else {
                  //this.Add_VisaCategory();
                     resolve(null)
                  }

          },error => resolve(null));
        }, 300);
  });
};
}

isValidNameNotInList_checktype(partnerid: number,url:string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {

  return new Promise((resolve, reject) => {  
    setTimeout(() => {
    
    this.MasterDataService.CheckDuplicatechecktype(url,partnerid,this.ChecktypeSection.controls['check_type_name'].value,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
              .subscribe( (qty: any) => {
              
                var allData_alreadyExist = CryptoJS.AES.decrypt(qty.Response, this.Shared.AuthKey).toString(CryptoJS.enc.Utf8);  
                
               var Json_alreadyExist = JSON.parse(allData_alreadyExist);
               
                
                let test=Json_alreadyExist;
             
                  if (test.length > 0) {
                    
                     resolve({ exists: true })
                  } else {
                  //this.Add_VisaCategory();
                     resolve(null)
                  }

          },error => resolve(null));
        }, 300);
  });
};
}


AddChecktype()
{
 
  let url = this.Shared.ApiURL + "insertchecktype";
  this.ChecktypeSection.patchValue({partner_id:this.Shared.PartnerId,check_type_status:1});



var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.ChecktypeSection.value), this.Shared.AuthKey).toString();

let str = '{"ciphertext":\"'+ encodeURIComponent(ciphertext) +'\","SessionId":\"'+ encodeURIComponent(this.Shared.SessionId) + '\","SessionToken":\"' + encodeURIComponent(this.Shared.SessionToken) + '\"}';
var jsonData = JSON.parse(str);

this.MasterDataService.create(url,jsonData)
  .subscribe(
    response => {
     
       var allData = CryptoJS.AES.decrypt(response.Response, this.Shared.AuthKey).toString(CryptoJS.enc.Utf8);  
  
       var Json_allData = JSON.parse(allData);

        this.ChecktypeSection.patchValue({check_type_id:Json_allData['insertId']});
     this.pro_checktypearray.push(this.ChecktypeSection.value);
     this.Add_AmberStatus(Json_allData['insertId']);
     this.LN.insert_Languagestring(Json_allData['insertId'],this.ChecktypeSection.value['check_type_name'],12);
   this.ChecktypeSubmitted = true;
   this.disableButton_checktype=false;

      
    },
    error => {
      console.log(error);
    });
  
}

AddChecktype_Sumbit() {
 
  this.disableButton_checktype=true;
  this.ChecktypeSubmitted = true;
  if (this.ChecktypeSection.invalid) {
    this.disableButton_checktype=false;
    return;
  }
  this.checkIfFormPassesValidation(this.ChecktypeSection)
  .then(valid => {
    if (valid) {
      // proceed
     
      this.AddChecktype();
    }
    else
    {
      this.disableButton_checktype=false;
    }
  });




  // let url = this.Shared.ApiURL + "insertchecktype";
  // this.ChecktypeSection.patchValue({partner_id:this.Shared.PartnerId,check_type_status:1});
 

  // this.MasterDataService.create(url,this.ChecktypeSection.value)
  // .subscribe(
  //   response => {
  //     console.log(response.insertId);
  //     this.ChecktypeSection.patchValue({check_type_id:response.insertId});
  //     this.pro_checktypearray.push(this.ChecktypeSection.value);
  //     console.log(this.ChecktypeSection.value);
  //     console.log(this.pro_checktypearray);
  //     this.ChecktypeSubmitted = true;
  //     this.Add_AmberStatus(response.insertId);
      
  //   },
  //   error => {
  //     console.log(error);
  //   });


}

Add_AmberStatus(id: number)
{
  let url = this.Shared.ApiURL + "InsertAmberStatus";
  this.MasterDataService.insert_amber(url,this.Shared.PartnerId,id,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
  .subscribe(
    response => {
   
      
    },
    error => {
      console.log(error);
    });
}


deleteBook(id: number) {

  let url = this.Shared.ApiURL + "Deletevisacategory";
  this.MasterDataService.Delete(url,id,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
  .subscribe(
    response => {
   
       this.pro_Visacategoryarray = this.pro_Visacategoryarray.filter(item => item.visa_category_id !== id);
    
       console.log(this.pro_Visacategoryarray);

     
      
    },
    error => {
      console.log(error);
    });
  
  

  





}

deletechecktype(id: number) {

  let url = this.Shared.ApiURL + "Deletechecktype";
  this.MasterDataService.Delete_checktype(url,id,this.Shared.AuthKey,this.Shared.SessionId,this.Shared.SessionToken)
  .subscribe(
    response => {
   
     
      this.pro_checktypearray = this.pro_checktypearray.filter(item => item.check_type_id !== id);
      console.log(this.pro_checktypearray);
    },
    error => {
      console.log(error);
    });
  
  






 
}



}


