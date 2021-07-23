import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, empty, Observable, ReplaySubject, Subject, timer } from 'rxjs';
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
    this.dataProcessingService.getData();

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      midlename: new FormControl('', [Validators.required]),
      surname: new FormControl(''),
      hasntSurname: new FormControl(this.checked),
      tel: new FormControl('', [Validators.required]),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(1024),
      ]),
    });
  }

  submit(): void {

    // const stream1$ = new Observable(observer => {
    //   observer.next(Math.random())
    // });

    // const subscriber1 = stream1$.subscribe({next: v => console.log(v), error: err => console.log(err), complete: () => console.log('Complete')});
    // const subscriber2 = stream1$.subscribe({next: v => console.log(v), error: err => console.log(err), complete: () => console.log('Complete')});

    // const stream2$ = new Subject();

    // stream2$.next(Math.random())

    // const subscriber3 = stream2$.subscribe(val => console.log('Subscriber 3: ' ,val));
    // const subscriber4 = stream2$.subscribe(val => console.log('Subscriber 4: ',val));

    // stream2$.next(Math.random())

    // const subscriber7 = stream2$.subscribe(val => console.log('Subscriber 7: ',val));

    // stream2$.next(Math.random())

    // const stream3$ = new BehaviorSubject(1);

    // stream3$.next(2)
    // stream3$.next(3)

    // const subscriber5 = stream3$.subscribe(val => console.log('Subscriber 5: ',val));
    // const subscriber6 = stream3$.subscribe(val => console.log('Subscriber 6: ',val));``

    // stream3$.next(4);

    // const subscriber8 = stream3$.subscribe(val => console.log('Subscriber 8: ',val));

    // const stream4$ = new ReplaySubject(2, 5000);

    // stream4$.next(1);
    // stream4$.next(2);
    // stream4$.next(3);
    // stream4$.next(4);

    // setTimeout(() => {
    //   stream4$.next(5)
    // }, 4000)

    // setTimeout(() => {
    //   stream4$.next(6)
    // }, 10000)

    // const subscriber9 = stream4$.subscribe(val => console.log('Subscriber 9: ', val));
    // const subscriber10 = stream4$.subscribe(val => console.log('Subscriber 10: ', val));

    if (this.form.valid) {
      const formData: IAppeal = { ...this.form.value };
      this.dataProcessingService.addAppeal(formData);
      this.checked = false;
      this.form.reset();
    }
  }

  onChangeChecked(): void {
    this.checked = !this.checked;
    if (this.checked) this.form.get('surname')?.setValue('');
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
      this.form.get('tel')?.value.length === 0 ||
      this.form.get('tel')?.value.includes('.')
    ) {
      this.completed = false;
    }
  }
}
