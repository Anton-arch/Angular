import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppeal } from './appeal-page/appeal-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService  {

  delIdx!: number;
  modalIsVisible = false;
  data: IAppeal[] = [];

  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get<IAppeal[]>('./../assets/data.json')
      .subscribe((value: IAppeal[]) => {
        this.data = value;
      })
  }

  getByIndex(index: number) {
    return this.data.find((appeal: IAppeal) => this.data.indexOf(appeal) === index);
  }

  filterData(delIdx: number) {
    this.data = this.data.filter((item: IAppeal) => this.data.indexOf(item) !== delIdx);
  }

  addAppeal(appeal: IAppeal) {
    this.data.unshift(appeal);
  }

  getData() {
    if(!this.data.length) {
      this.fetchData()
    }
  }
}
