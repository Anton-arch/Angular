import { Component, OnInit } from '@angular/core';
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
  providers: [DataProcessingService]
})
export class AppealPageComponent implements OnInit {

  searchInput = '';
  modalVisible = false;
  appealItemIndex: number | undefined;
  appeals: IAppeal[] = [];
  loading = false;

  constructor(private dataProcessingService: DataProcessingService) { }

  ngOnInit(): void {

    this.dataProcessingService.fetchData()
      .subscribe((value: IAppeal[]) => {
        this.loading = true;
        this.appeals = value;
      })

  }

  getIndexRemovedAppealItem(index: number) {
    this.modalVisible = true;
    this.appealItemIndex = index;
  }

  canceledRemoveAppealItem(event: boolean) {
    this.modalVisible = event;
  }

  confirmedRemoveAppealItem(event: boolean) {
    if(this.modalVisible) this.appeals = this.appeals.filter(item => this.appeals.indexOf(item) !== this.appealItemIndex)
    this.modalVisible = !event;
  }

}
