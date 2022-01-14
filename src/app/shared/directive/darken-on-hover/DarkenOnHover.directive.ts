import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDarkenOnHover]',
})
export class DarkenOnHoverDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseover')
  darkenOn(): void {
    this.el.nativeElement.style.filter = 'brightness(70%)';
  }

  @HostListener('mouseleave')
  darkenOff(): void {
    this.el.nativeElement.style.filter = 'brightness(100%)';
  }
}
