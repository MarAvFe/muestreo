import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';
import { AnalyzeComponent } from './analyze.component';
import { AnalyzeService } from './analyze.service';
import { TabComponent } from './tab';
import { TabsComponent } from './tabs';
import { routing } from './analyze.routing';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RenderBitComponent } from './customComponents/renderBit.component';
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
        AnalyzeComponent,
        RenderBitComponent,
        TabComponent,
        TabsComponent,
    ],
    entryComponents: [
        RenderBitComponent,
    ],
    providers: [
        AnalyzeService,
        Globals,
    ],
})
export class AnalyzeModule {}
