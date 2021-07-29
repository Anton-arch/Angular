import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAppeal } from './appeal-page/appeal-page.component';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataProcessingService {
  delIdx?: number;
  modalIsVisible = false;
  data: IAppeal[] = [];
  loading = false;

  constructor(private apisService: ApiService) {}

  getByIndex(index: number) {
    return this.data.find((appeal: IAppeal) => this.data.indexOf(appeal) === index);
  }

  filterData(delIdx?: number) {
    this.apisService.deleteData(delIdx).subscribe(() => {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
        });
      });
    });
  }

  addAppeal(appeal: IAppeal) {
    this.apisService.postData(appeal).subscribe((value: IAppeal) => {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
        });
      });
    });
  }

  getData() {
    if (!this.data.length) {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
          this.loading = true;
        });
      });
    }

    interval(30000)
      .subscribe(() => {
        this.apisService.preFetchData().subscribe((val: any) => {
          this.apisService.fetchData(0, val.total).subscribe((value: any) => {
            this.data = value.orders;
          });
        });
      })
  }

  reloadData() {
    this.loading = false;
    this.apisService.preFetchData().subscribe((val: any) => {
      this.apisService.fetchData(0, val.total).subscribe((value: any) => {
        this.data = value.orders;
        this.loading = true;
      });
    });
  }
}
