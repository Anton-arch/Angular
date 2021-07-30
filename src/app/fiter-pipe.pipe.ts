import { Pipe, PipeTransform } from '@angular/core';
import { IAppeal } from './appeal-page/appeal-page.component';

@Pipe({
  name: 'fiterPipe',
  pure: false //стратегия поведения пайпа, влияет на его оптимизацию, по умолчанию true
})
export class FiterPipePipe implements PipeTransform {

  transform(appeals: IAppeal[], search: string = ''): IAppeal[] {
    if (!search.trim()) {
      return appeals;
    }

    return appeals.filter(item => item.middleName?.toLowerCase().includes(search.toLowerCase()))
  }
}
