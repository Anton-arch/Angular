import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAppeal } from './appeal-page/appeal-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService  {

  delIdx!: number;
  modalIsVisible = false;
  data: IAppeal[] = [];

  constructor(private apisService: ApiService) {}

  getByIndex(index: number) {
    return this.data.find((appeal: IAppeal) => this.data.indexOf(appeal) === index);
  }

  filterData(delIdx: number) {
    this.data = this.data.filter((item: IAppeal) => this.data.indexOf(item) !== delIdx);
  }

  addAppeal(appeal: IAppeal) {
    this.apisService.postData(appeal)
      .subscribe((value: IAppeal) => {
        this.apisService.fetchData(0, 13)
          .subscribe((value: any) => {
            console.log(value)
          })
      })
  }

  getData() {
    if(!this.data.length) {
      this.apisService.fetchData(0, 13)
        .subscribe((value: any) => {
          this.data = value.orders;
        })
    }
  }

}
