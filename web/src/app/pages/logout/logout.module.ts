import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Logout } from './logout.component';
import { routing } from './logout.routing';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        AppTranslationModule,
        routing,
    ],
    declarations: [
        Logout,
    ],
})
export class LogoutModule {}
