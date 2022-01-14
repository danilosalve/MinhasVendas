
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DarkenOnHoverDirective } from './darken-on-hover/DarkenOnHover.directive';

@NgModule({
  declarations: [
    DarkenOnHoverDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DarkenOnHoverDirective
  ]
})
export class DirectiveModule { }
