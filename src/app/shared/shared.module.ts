import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { DirectiveModule } from './directive/directive.module';

@NgModule({
  declarations: [
    FilterInputComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoTemplatesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DirectiveModule
  ],
  exports: [
    CommonModule,
    PoModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PoTemplatesModule,
    FilterInputComponent,
    DirectiveModule
  ]
})
export class SharedModule {}
