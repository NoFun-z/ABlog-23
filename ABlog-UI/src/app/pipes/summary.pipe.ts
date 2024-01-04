import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(content: string, characterLimit: number): string {
    if (content.length <= characterLimit) {
      return content;
    } else {
      return `${content.substring(0, characterLimit)}...`;
    }
  }

}