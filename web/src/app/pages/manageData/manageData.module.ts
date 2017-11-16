import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { ManageDataComponent } from './manageData.component';
import { routing } from './manageData.routing';
import { ManageDataService } from './manageData.service';
import { RenderBitComponent } from './customComponents/renderBit.component';
import { Globals } from '../Globals';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
        routing,
        ToastModule.forRoot(),
    ],
    entryComponents: [
        RenderBitComponent,
    ],
    declarations: [
        ManageDataComponent,
        RenderBitComponent,
    ],
    providers: [
        ManageDataService,
        Globals,
    ],
})
export class ManageDataModule {}
