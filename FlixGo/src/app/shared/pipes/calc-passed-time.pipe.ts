import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcTime'
})
export class CalcTimePipe implements PipeTransform {

  transform(createdTimestamp: Number | null | undefined): unknown {
    if(!createdTimestamp) return null;
    
    const creationDate = Number(createdTimestamp);
    const currentDate = new Date();

    const timePassedTimestamp = currentDate.getTime() - creationDate;

    const days = Math.floor(timePassedTimestamp / (1000 * 3600 * 24));
    const hours = Math.floor(timePassedTimestamp / (1000 * 60 * 60));
    const minutes = Math.floor(timePassedTimestamp / (1000 * 60));
    const seconds = Math.floor(timePassedTimestamp / 1000);

    if(days < 1 && hours < 1 && minutes < 1) return `${seconds} seconds ago`;
    if(days < 1 && hours < 1 && minutes === 1) return `${minutes} minute ago`;
    if(days < 1 && hours < 1 && minutes >= 1) return `${minutes} minutes ago`;
    if(days < 1 && hours >= 1) return `${hours} hours ago`;
    if(days >= 1) return `${days} days ago`;
    return null;
  }

}
