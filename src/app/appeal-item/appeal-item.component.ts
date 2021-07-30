import { Component, Input } from '@angular/core';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-appeal-item',
  templateUrl: './appeal-item.component.html',
  styleUrls: ['./appeal-item.component.scss'],
})
export class AppealItemComponent {
  @Input() firstName = '';
  @Input() lastName = '';
  @Input() middleName? = '';
  @Input() userPhone = '';
  @Input() text = '';
  @Input() index!: number;
  @Input() orderId?: number;

  constructor(private dataProcessingService: DataProcessingService) {}

  deleteAppealItem(event: Event) {
    event.stopPropagation();
    this.dataProcessingService.modalIsVisible = true;
    this.dataProcessingService.delIdx = this.orderId;
  }
}
