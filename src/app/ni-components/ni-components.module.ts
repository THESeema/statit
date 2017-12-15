import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { NiCardComponent }       from './ni-card/ni-card.component';
import { GradientDirective }     from './directives/gradient/gradient.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NiCardComponent,
    GradientDirective
  ],
  exports: [
    NiCardComponent,
    GradientDirective
  ]
})
export class NiComponentsModule { }
