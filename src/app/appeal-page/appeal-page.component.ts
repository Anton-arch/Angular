import { Component, DoCheck, OnInit } from '@angular/core';
import { DataProcessingService } from '../data-processing.service';

export interface IAppeal {
  name: string,
  midlename: string,
  surname?: string,
  tel: string,
  text: string,
}

@Component({
  selector: 'app-appeal-page',
  templateUrl: './appeal-page.component.html',
  styleUrls: ['./appeal-page.component.scss'],
})
export class AppealPageComponent implements OnInit, DoCheck {
  searchInput = '';
  modalVisible = false;
  appeals: IAppeal[] = [];
  loading = false;

  constructor(private dataProcessingService: DataProcessingService) { }

  ngOnInit() {
    this.dataProcessingService.getData();
  }

  ngDoCheck() {
    this.appeals = this.dataProcessingService.data;
    this.loading = true;
  }
}
