import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppeal } from '../appeal-page/appeal-page.component';
import { DataProcessingService } from '../data-processing.service';

@Component({
  selector: 'app-create-appeal',
  templateUrl: './create-appeal.component.html',
  styleUrls: ['./create-appeal.component.scss']
})
export class CreateAppealComponent implements OnInit {

  form!: FormGroup;

  checked = false;

  constructor(private dataProcessingService: DataProcessingService) { }

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

      this.checked = false;
      this.form.reset();
    }
  }

  onChangeChecked() {
    this.checked = !this.checked;
    if(this.checked) this.form.get('surname')?.setValue('');
  }
}
