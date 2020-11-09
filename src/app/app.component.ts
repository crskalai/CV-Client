import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { from } from 'rxjs';
import { CaseListComponent } from '../app/case/case-list/case-list.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CV2';
  @ViewChild(CaseListComponent, { static: true }) hello: CaseListComponent;
  constructor(public router: Router) { 
    console.log(router.url); 
  }
  ngAfterViewInit() {
    console.log("Hello ", this.hello);
 }
}
