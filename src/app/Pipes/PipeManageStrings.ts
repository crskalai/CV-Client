import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'SearchString',
    pure: false
  })
  export class FilterStrings implements PipeTransform {
    transform(items: any[], searchText): any {
      console.log('term', searchText);
      if(searchText != "")
       return items.filter(item=>{   
        const stringCode = item.string_code.toLowerCase().includes(searchText.toLowerCase())
        const stringName = item.string_name.toLowerCase().includes(searchText.toLowerCase())
        return (stringCode +  stringName);      
    })  
           
           else
           return items;
   }
  }