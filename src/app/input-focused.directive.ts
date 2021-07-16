import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputFocused]'
})
export class InputFocusedDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('focus', ['$event']) onFocus(event: Event) {
    this.renderer.setStyle(event.composedPath()[1], 'border-color', '#2F80ED');
    this.renderer.setStyle(event.composedPath()[1], 'color', '#2F80ED');
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    this.renderer.setStyle(event.composedPath()[1], 'border-color', null);
    this.renderer.setStyle(event.composedPath()[1], 'color', null);
  }

  ngOnInit() {
  }

}
