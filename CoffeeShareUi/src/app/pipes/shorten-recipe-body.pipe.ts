import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenRecipeBody'
})
export class ShortenRecipeBodyPipe implements PipeTransform {

  transform(value: string): string {
    return value;
  }

}
