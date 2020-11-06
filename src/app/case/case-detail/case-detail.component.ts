import { Component, OnInit } from '@angular/core';
import {UtilityJqueryService } from '../../utility/utility-jquery.service';
@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {

  constructor(public jsutility:UtilityJqueryService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){

    this.jsutility.windowResize();

  }
}
