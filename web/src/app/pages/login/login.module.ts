import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Login } from './login.component';
import { LoginService } from './login.service';
import { routing } from './login.routing';
import { Network } from '../Network';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        AppTranslationModule,
        ReactiveFormsModule,
        ToastModule.forRoot(),
        routing,
    ],
    declarations: [
        Login,
    ],
    providers: [
        LoginService,
        Network,
    ],
})
export class LoginModule {}
