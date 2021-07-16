import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Input() index: number | undefined;

  @Output() deleteAppeal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteAppealItem(event: Event) {
    event.stopPropagation();
    this.deleteAppeal.emit(this.index);
  }
}
