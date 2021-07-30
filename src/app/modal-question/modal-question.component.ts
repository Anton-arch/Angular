import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  DoCheck,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-modal-question',
  templateUrl: './modal-question.component.html',
  styleUrls: ['./modal-question.component.scss'],
})
export class ModalQuestionComponent implements DoCheck {
  @ViewChild('modal') modal: ElementRef | undefined;

  constructor(
    private renderer: Renderer2,
    private dataProcessingService: DataProcessingService,
    private router: Router
  ) {}

  ngDoCheck() {
    this.dataProcessingService.modalIsVisible
      ? this.renderer.setStyle(
          this.modal?.nativeElement,
          'visibility',
          'visible'
        )
      : this.renderer.setStyle(
          this.modal?.nativeElement,
          'visibility',
          'hidden'
        );
  }

  onCancelRemoveAppelaItem() {
    this.dataProcessingService.modalIsVisible = false;
  }

  onConfirmRemoveAppealItem() {
    this.dataProcessingService.modalIsVisible = false;
    this.dataProcessingService.filterData(this.dataProcessingService.delIdx);
    this.router.navigate(['/appealPage']);
  }
}
