import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConsultComponent } from './consult.component';
import { routing } from './consult.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ConsultComponent
  ]
})
export class ConsultModule {}
