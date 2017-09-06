import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppTranslationModule } from '../../app.translation.module';
import { LineChart } from './lineChart';
import { TrafficChart } from './trafficChart';

import { AnalyzeComponent } from './analyze.component';
import { AnalyzeService } from './analyze.service';
import { LineChartService } from './lineChart/lineChart.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { routing } from './analyze.routing';

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
        AnalyzeComponent,
        LineChart,
        TrafficChart,
    ],
    providers: [
        AnalyzeService,
        LineChartService,
        TrafficChartService,
    ],
})
export class AnalyzeModule {}
