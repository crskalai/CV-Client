import { Component, OnInit } from '@angular/core';
import {UtilityJqueryService } from '../utility/utility-jquery.service';
import { Shared } from '../Models/common-data';
import {languagestrings} from './shared/countryconfig.model';
import {TranslateService} from '@ngx-translate/core'
@Component({
  selector: 'app-countryconfig',
  templateUrl: './countryconfig.component.html',
  styleUrls: ['./countryconfig.component.css']
})
export class CountryconfigComponent implements OnInit {

  constructor(public jsutility:UtilityJqueryService,private Shared:Shared,private translateservice:TranslateService) { }
  ngAfterViewInit(){

    this.jsutility.windowResize();
    console.log(this.Shared.Missions[0]);
    // this.translateservice.instant("Mission");
    // console.log(this.translateservice.instant("Mission"));
  }
  ngOnInit(): void {
  }

}
