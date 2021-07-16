import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IAppeal } from '../appeal-page/appeal-page.component';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.scss'],
  providers: [DataProcessingService]
})
export class AppealComponent implements OnInit {

  appeal!: any;

  constructor(
    private route: ActivatedRoute,
    private dataProcessingService: DataProcessingService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.appeal = this.dataProcessingService.getByIndex(+params.index))
  }

  deleteAppeal() {

  }
}
