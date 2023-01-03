import { Pipe, PipeTransform } from '@angular/core';

//Pipe to allow iteration of objects and arrays for NgFor

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
