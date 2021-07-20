import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppeal } from '../appeal-page/appeal-page.component';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-create-appeal',
  templateUrl: './create-appeal.component.html',
  styleUrls: ['./create-appeal.component.scss']
})
export class CreateAppealComponent implements OnInit {

  completed = false;
  form!: FormGroup;
  checked = false;

  constructor(
    private dataProcessingService: DataProcessingService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.dataProcessingService.getData();

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      midlename: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('', [

      ]),
      hasntSurname: new FormControl(this.checked),
      tel: new FormControl('', [

      ]),
      text: new FormControl('',[
        Validators.required,
        Validators.maxLength(1024)
      ]),
    });

  }

  submit() {

    if(this.form.valid) {
      const formData: IAppeal = {...this.form.value};
      this.dataProcessingService.addAppeal(formData);

      console.log(formData.tel.length)

      this.checked = false;
      this.form.reset();
    }
  }

  onChangeChecked() {
    this.checked = !this.checked;
    if(this.checked) this.form.get('surname')?.setValue('');
  }

  focused(event: Event) {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', '#2F80ED');
    this.renderer.setStyle(event.composedPath()[2], 'color', '#2F80ED');
  }

  blured(event: Event) {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', null);
    this.renderer.setStyle(event.composedPath()[2], 'color', null);
  }

  comleted() {
    this.completed = true;
  }
}
