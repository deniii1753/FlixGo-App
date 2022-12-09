import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTIme'
})
export class ConvertTimePipe implements PipeTransform {

  transform(createdTimestamp: Number | string | null | undefined): unknown {
    if(!createdTimestamp) return null;
    
    const date = new Date(Number(createdTimestamp));
    
    const year = date.getFullYear();
    let month = date.getMonth() + 1 as string | number;
    let day = date.getDate() as string | number;

    if(month < 10) month = `0${month}`;
    if(day < 10) day = `0${day}`;
    
    return `${day}/${month}/${year}`;
  }

}
