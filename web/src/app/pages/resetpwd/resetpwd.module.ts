import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResetPwdComponent } from './resetpwd.component';
import { routing } from './resetpwd.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ResetPwdComponent
  ]
})
export class ResetPwdComponent {}
