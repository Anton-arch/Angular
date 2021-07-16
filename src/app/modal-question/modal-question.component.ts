import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-question',
  templateUrl: './modal-question.component.html',
  styleUrls: ['./modal-question.component.scss']
})
export class ModalQuestionComponent implements OnInit, OnChanges {
  @Input() modalVisible = false;

  @Output() cancelReomoveAppelaItem = new EventEmitter();
  @Output() confirmRemoveAppealItem = new EventEmitter();

  @ViewChild('modal', {static: true}) modal: ElementRef | undefined;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.modalVisible ? this.renderer.setStyle(this.modal?.nativeElement, 'visibility', 'visible') : this.renderer.setStyle(this.modal?.nativeElement, 'visibility', 'hidden');
  }

  onCancelRemoveAppelaItem() {
    this.cancelReomoveAppelaItem.emit(false);
  }

  onConfirmRemoveAppealItem() {
    this.confirmRemoveAppealItem.emit(true);
  }

}
