import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {UtilityJqueryService } from '../../utility/utility-jquery.service';
import {ApiCallService } from '../../Services/api-call.service';
import {CaseService} from '../../case/case.service';
@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css'],
  providers:[{provide:CaseService,useClass:CaseService}]
})
export class CaseDetailComponent implements OnInit {
  ListItems:any=[];
  constructor(public jsutility:UtilityJqueryService,private callCaseService:CaseService) { }

  ngOnInit(): void {
     this.LoadList();
  }
   LoadList(){
    this.callCaseService.getCheckliSt(1,2233,2).subscribe(data=>{
     
      this.ListItems=data.Response;
    });
   
  }
  ngAfterViewInit(){

    this.jsutility.windowResize();

  }
}
