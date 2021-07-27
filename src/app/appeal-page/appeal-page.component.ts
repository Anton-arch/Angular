import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataProcessingService } from '../data-processing.service';

export interface IAppeal {
  firstName: string,
  lastName: string,
  withoutMiddleName: boolean,
  middleName?: string,
  userPhone: string,
  text: string,
}

@Component({
  selector: 'app-appeal-page',
  templateUrl: './appeal-page.component.html',
  styleUrls: ['./appeal-page.component.scss'],
})
export class AppealPageComponent implements OnInit, DoCheck, OnDestroy {
  searchInput = '';
  modalVisible = false;
  appeals: IAppeal[] = [];
  loading = false;

  constructor(private dataProcessingService: DataProcessingService) { }

  ngOnInit() {
    this.dataProcessingService.getData();
  }

  // stream$ = new BehaviorSubject([]).subscribe(() => {
  //   this.appeals = this.dataProcessingService.data;
  //   this.loading = true;
  // });

  ngDoCheck() {
    this.appeals = this.dataProcessingService.data;
    this.loading = true;
  }

  ngOnDestroy() {
    // this.stream$.unsubscribe();
  }
}
