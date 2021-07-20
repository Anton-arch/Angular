import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-appeal-item',
  templateUrl: './appeal-item.component.html',
  styleUrls: ['./appeal-item.component.scss']
})
export class AppealItemComponent implements OnInit {
  @Input() name = '';
  @Input() midlename = '';
  @Input() surname? = '';
  @Input() tel = '';
  @Input() text = '';
  @Input() index!: number;

  constructor(private dataProcessingService: DataProcessingService) { }

  ngOnInit(): void {
  }

  deleteAppealItem(event: Event) {
    event.stopPropagation();
    this.dataProcessingService.modalIsVisible = true;
    this.dataProcessingService.delIdx = this.index;
  }
}
