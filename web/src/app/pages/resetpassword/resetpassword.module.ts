import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { ResetPassword } from './resetpassword.component';
import { routing } from './resetpassword.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    AppTranslationModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    ResetPassword
  ]
})
export class ResetPasswordModule {}
