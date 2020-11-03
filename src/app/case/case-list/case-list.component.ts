import { Component, OnInit } from '@angular/core';
import {UtilityJqueryService } from '../../utility/utility-jquery.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})

export class CaseListComponent implements OnInit {
  public innerWidth: any;
 

  contentHeight: number;
  constructor(public jsutility:UtilityJqueryService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(){

    this.jsutility.windowResize();

  }


}
