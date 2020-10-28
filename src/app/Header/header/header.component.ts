import { Component, OnInit } from '@angular/core';
import { Shared } from '../../Models/common-data';
import { ApiCallService } from '../../Services/api-call.service';
import { EncrDecrService } from '../../Services/encr-decr.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public menuItemsArray: any[] = [];
  menuList : any;
  menu_id: Number;
  parent_menu_id: Number;
  flag = 0;
  fullname: string;
  constructor(private router: Router, private shared: Shared, private apiService: ApiCallService, private EncrDecr: EncrDecrService) { 
    this.menuList = this.shared.MenuObj;
    console.log("this.menuList",this.menuList);
    this.fullname = this.shared.FullName;//"Admin 123";
  }

  ngOnInit(): void {
    this.MenuDetails();
  }
  MenuDetails()
  {
    for(let i=0;i<this.menuList.length;i++)
    {
      let p = this.menuList[i].parent_menu_id;
      if(p == 0)
      {
        this.menu_id = this.menuList[i].menu_id;
        for(let j=0;j<this.menuList.length;j++)
        {
          if(this.menu_id == this.menuList[j].parent_menu_id)
          {
            this.flag = 1;
          }
        }
        if(this.flag == 0)
        {
          //let mn = this.menuList[i].menu_name;
          let mn = this.menuList[i].string_name;
          let ml = this.menuList[i].menu_link;
          this.menuItemsArray.push({"id":this.menu_id,"title":mn,"link":ml, "class1": "nav-item", "class2": "nav-link", "isChild": 0});
        }
        else
        {
          let arr1: any[] = [];
          //let mn = this.menuList[i].menu_name;
          let mn = this.menuList[i].string_name;
          let ml = this.menuList[i].menu_link;
          //let ml = this.menuList[i].menu_link + "/, "+ this.menuList[i].menu_id ;
          //this.menuItemsArray.push({"title":mn,"link":ml});
          for(let k=0;k<this.menuList.length;k++)
          {
            if(this.menu_id == this.menuList[k].parent_menu_id)
            {
              // let mn1 = this.menuList[k].menu_name;
              let mn1 = this.menuList[k].string_name;
              let ml1 = this.menuList[k].menu_link;
             // let s1 = {"subItems":[{"title":mn1,"link":ml1}]};
             arr1.push({"title":mn1,"link":ml1, "id": this.menu_id});
            }
          }
          this.menuItemsArray.push({"id":this.menu_id,"title":mn,"link":ml,"subItems": arr1, "class1": "nav-item dropdown", "class2": "nav-link dropdown-toggle", "isChild": 1});
          //console.log("arr1",arr1);
          this.flag = 0;
        }
      }
    }
    console.log("mi",this.menuItemsArray);
  }
  ChangeStatus(id: Number)
  {
    
    let str = "{\"session_id\":\""+ this.shared.SessionId +"\",\"session_token\":\""+ this.shared.SessionToken + "\",\"status\":"+ id +"}";
      this.apiService.get(this.shared.ApiURL + "removesess", str).subscribe(data => {
      alert(data); 
      //alert(id + "=" + data);
      // if(id == 0)
      // {
      //   this.router.navigate(['/login']);
      // }
    });
  }
}
