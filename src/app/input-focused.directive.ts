import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputFocused]'
})
export class InputFocusedDirective {
  $blue = '#2F80ED';

  constructor(private renderer: Renderer2) { }

  @HostListener('focus', ['$event']) onFocus(event: Event) {
    this.renderer.setStyle(event.composedPath()[1], 'border-color', this.$blue);
    this.renderer.setStyle(event.composedPath()[1], 'color', this.$blue);
  }

  @HostListener('blur', ['$event']) onBlur(event: Event) {
    this.renderer.setStyle(event.composedPath()[1], 'border-color', null);
    this.renderer.setStyle(event.composedPath()[1], 'color', null);
  }
}
