import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDomainFromEmail'
})
export class RemoveDomainFromEmailPipe implements PipeTransform {

  transform(value: string): string {
    return value.substring(0, value.lastIndexOf('@'));;
 }

}
