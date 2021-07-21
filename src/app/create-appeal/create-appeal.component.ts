import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
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
  $blue = '#2F80ED';
  completed = false;

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
      surname: new FormControl(''),
      hasntSurname: new FormControl(this.checked),
      tel: new FormControl('', [
        Validators.required,
      ]),
      text: new FormControl('',[
        Validators.required,
        Validators.maxLength(1024)
      ]),
    });
  }

  submit() {
    const sbj = new Subject<number>();
    const obs = new Observable<number>(observer => {
      let conter = 1;
      setInterval(() => {
        observer.next(conter++)
      }, 1000)
    })

    obs.subscribe(val => console.log(val));

    // sbj.subscribe((vl) => console.log(`1st: ${vl}`));
    // sbj.next(3);
    // sbj.subscribe((vl) => console.log(`2nd: ${vl}`));
    // sbj.next(9);


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

  onFocused(event: Event) {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', this.$blue);
    this.renderer.setStyle(event.composedPath()[2], 'color', this.$blue);
  }

  onBlured(event: Event) {
    this.renderer.setStyle(event.composedPath()[2], 'border-color', null);
    this.renderer.setStyle(event.composedPath()[2], 'color', null);
  }

  onComplete() {
    this.completed = true;
  }
}
