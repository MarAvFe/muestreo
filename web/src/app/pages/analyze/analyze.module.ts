import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';
import { AnalyzeComponent } from './analyze.component';
import { AnalyzeService } from './analyze.service';

import { routing } from './analyze.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RenderBitComponent } from './customComponents/renderBit.component';

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
        AnalyzeComponent,
        RenderBitComponent,
    ],
    entryComponents: [
        RenderBitComponent,
    ],
    providers: [
        AnalyzeService,
    ],
})
export class AnalyzeModule {}
