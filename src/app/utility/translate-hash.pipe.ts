import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateHash'
})
export class TranslateHashPipe implements PipeTransform {

  transform(items: any[], term): any {
   
    return items.filter(item => (item.string_code == term))[0].string_name;
        
  }

}
