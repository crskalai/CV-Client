import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { SecurityContext } from "@angular/core";
 
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: any, args?: any): any {
      console.log("value:"+value);
      var dom = this.sanitizer.sanitize(SecurityContext.SCRIPT, value);
  console.log(dom);
    return dom;
  }
 
}