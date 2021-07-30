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

  constructor(public dataProcessingService: DataProcessingService) {}

  ngOnInit() {
    this.dataProcessingService.getData();
  }

  ngDoCheck() {
    this.loading = this.dataProcessingService.loading;
    this.appeals = this.dataProcessingService.slicingData();
  }

  reloadInfo() {
    this.dataProcessingService.reloadData();
  }

  prevPage() {
    if (this.dataProcessingService.pageCounter > 1) {
      this.dataProcessingService.pageCounter--;
      this.appeals = this.dataProcessingService.slicingData();
    }
  }

  nextPage() {
    if (this.appeals.length === 13) {
      this.dataProcessingService.pageCounter++;
      this.appeals = this.dataProcessingService.slicingData();
    }
  }
}
