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

  //To display text when appeals loaded
  loading = false;

  //To display text when appeal deleting
  deleteAppealOverlay = false;

  //For pagination
  appealsOnPage = 13;
  pageCounter = 1;

  constructor(private apisService: ApiService) {}

  getByIndex(index: number) {
    return this.data.find(
      (appeal: IAppeal) => this.data.indexOf(appeal) === index
    );
  }

  filterData(delIdx?: number): void {
    this.deleteAppealOverlay = true;
    this.apisService.deleteData(delIdx).subscribe(() => {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
          this.deleteAppealOverlay = false;
        });
      });
    });
  }

  addAppeal(appeal: IAppeal): void {
    this.apisService.postData(appeal).subscribe((value: IAppeal) => {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
        });
      });
    });
  }

  getData(): void {
    if (!this.data.length) {
      this.apisService.preFetchData().subscribe((val: any) => {
        this.apisService.fetchData(0, val.total).subscribe((value: any) => {
          this.data = value.orders;
          this.loading = true;
          this.slicingData();
        });
      });
    }

    // interval(30000)
    //   .subscribe(() => {
    //     this.apisService.preFetchData().subscribe((val: any) => {
    //       this.apisService.fetchData(0, val.total).subscribe((value: any) => {
    //         this.data = value.orders;
    //       });
    //     });
    //   })
  }

  reloadData(): void {
    this.loading = false;
    this.apisService.preFetchData().subscribe((val: any) => {
      this.apisService.fetchData(0, val.total).subscribe((value: any) => {
        this.data = value.orders;
        this.loading = true;
      });
    });
  }

  slicingData() {
    const start = (this.pageCounter - 1) * this.appealsOnPage;
    const end = start + this.appealsOnPage;

    return this.data.slice(start, end);
  }
}
