import { Component, DoCheck, OnInit } from '@angular/core';
import { DataProcessingService } from '../data-processing.service';

export interface IAppeal {
  firstName: string;
  lastName: string;
  withoutMiddleName: boolean;
  middleName?: string;
  userPhone: string;
  text: string;
  orderId?: number;
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

  constructor(
    private dataProcessingService: DataProcessingService
  ) {}

  ngOnInit() {
    this.dataProcessingService.getData();
  }

  ngDoCheck() {
    this.appeals = this.dataProcessingService.data;
    this.loading = this.dataProcessingService.loading;
  }

  reloadInfo() {
    this.dataProcessingService.reloadData();
  }
}
