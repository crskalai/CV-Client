import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class UtilityJqueryService {

  constructor() { }

  windowResize(){
    var total_height = $(window).innerHeight();
 var header_height = $("header").outerHeight();
 var heading_height = $(".vertical-scroll-title").outerHeight();
 var empty_height =  total_height - header_height;
 var vertical_scroll =  total_height - (header_height + heading_height);
 $(".vertical-scroll").height(vertical_scroll - 24);
 $(".tab-content").height(vertical_scroll -102);
  }
  toggleButton(x){
    
      var hideShow = document.getElementById("hideDiv");
      if (hideShow.style.display === "none") {
        hideShow.style.display = "block";
      } else {
        hideShow.style.display = "none";
      }
      console.log(x.classList)
      if (x.classList[1] == "fa-angle-right") {
        x.classList.remove("fa-angle-right")
        x.classList.add("fa-angle-left")
      }
      else {
        x.classList.remove("fa-angle-left")
        x.classList.add("fa-angle-right")
      }
      

  }
}
