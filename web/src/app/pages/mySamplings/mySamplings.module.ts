import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';

import { MySamplingsComponent } from './mySamplings.component';
import { MySamplingsService } from './mySamplings.service';
import { routing } from './mySamplings.routing';

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
        MySamplingsComponent,
    ],
    providers: [
        MySamplingsService,
    ]
})
export class MySamplingsModule {}
