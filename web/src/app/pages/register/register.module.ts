import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Register } from './register.component';
import { RegisterService } from './register.service';
import { routing } from './register.routing';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppTranslationModule,
        FormsModule,
        NgaModule,
        ToastModule.forRoot(),
        routing,
    ],
    declarations: [
        Register,
    ],
    providers: [
        RegisterService,
    ],
})
export class RegisterModule {}
