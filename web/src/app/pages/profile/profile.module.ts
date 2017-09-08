import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { routing } from './profile.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        AppTranslationModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        ProfileComponent,
    ],
    providers: [
        ProfileService,
    ]
})
export class ProfileModule {}
