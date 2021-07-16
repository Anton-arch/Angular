import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppeal } from '../appeal-page/appeal-page.component';

@Component({
  selector: 'app-create-appeal',
  templateUrl: './create-appeal.component.html',
  styleUrls: ['./create-appeal.component.scss']
})
export class CreateAppealComponent implements OnInit {

  form!: FormGroup;

  checked: boolean = false;

  constructor() { }

  ngOnInit() {
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
        Validators.required
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

      console.log(formData);

      this.checked = false;
      this.form.reset();
    }
  }

  onChangeChecked() {
    this.checked = !this.checked;
    if(this.checked) this.form.get('surname')?.reset();
  }
}
