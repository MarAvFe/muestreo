import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { MySamplingsComponent } from './mySamplings.component';
import { MySamplingsService } from './mySamplings.service';
import { routing } from './mySamplings.routing';
import { Globals } from '../Globals';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        AppTranslationModule,
        Ng2SmartTableModule,
        ToastModule.forRoot(),
    ],
    declarations: [
        MySamplingsComponent,
    ],
    providers: [
        MySamplingsService,
        Globals,
    ],
})
export class MySamplingsModule {}
