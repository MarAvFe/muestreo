import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ResetPassword } from './resetpassword.component';
import { routing } from './resetpassword.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ResetPassword
  ]
})
export class ResetPasswordModule {}
