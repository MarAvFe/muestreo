import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnalyzeComponent } from './analyze.component';
import { routing } from './analyze.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AnalyzeComponent
  ]
})
export class AnalyzeModule {}
