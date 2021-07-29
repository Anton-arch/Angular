import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfNot]'
})
export class IfNotDirective implements OnInit {

  @Input('appIfNot') set ifNot(condition: boolean) {
    condition ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    console.log(this.templateRef.elementRef)
    console.log(this.viewContainer)
  }

}
