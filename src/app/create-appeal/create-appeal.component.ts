import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppeal } from '../appeal-page/appeal-page.component';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-create-appeal',
  templateUrl: './create-appeal.component.html',
  styleUrls: ['./create-appeal.component.scss'],
})
export class CreateAppealComponent implements OnInit {
  form!: FormGroup;
  checked = false;
  $blue = '#2F80ED';
  completed = false;

  constructor(
    private dataProcessingService: DataProcessingService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      withoutMiddleName: new FormControl(this.checked),
      middleName: new FormControl(''),
      userPhone: new FormControl('', [Validators.required]),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(1024),
      ]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const formData: IAppeal = { ...this.form.value };
      console.log(formData)
      this.dataProcessingService.addAppeal(formData);
      this.checked = false;
      this.form.reset();
    }
  }

  onChangeChecked(): void {
    this.checked = !this.checked;
    if (this.checked) this.form.get('middleName')?.setValue('');
  }

  onFocused(event: Event): void {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', this.$blue);
    this.renderer.setStyle(event.composedPath()[2], 'color', this.$blue);
  }

  onBlured(event: Event): void {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', null);
    this.renderer.setStyle(event.composedPath()[2], 'color', null);
  }

  onKeydown() {
    this.completed = true;

    if (
      this.form.get('userPhone')?.value.length === 0 ||
      this.form.get('userPhone')?.value.includes('.')
    ) {
      this.completed = false;
    }
  }
}
