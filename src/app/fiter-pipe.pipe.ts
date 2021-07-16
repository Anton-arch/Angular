import { Pipe, PipeTransform } from '@angular/core';
import { IAppeal } from './appeal-page/appeal-page.component';

@Pipe({
  name: 'fiterPipe'
})
export class FiterPipePipe implements PipeTransform {

  transform(appeals: IAppeal[], search: string = ''): IAppeal[] {
    if(!search.trim()) {
      return appeals;
    }

    return appeals.filter(item => item.midlename.toLowerCase().includes(search.toLowerCase()))
  }

}
