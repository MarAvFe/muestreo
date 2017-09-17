import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { EditComponent } from './edit.component';
import { routing } from './edit.routing';
import { EditService } from './edit.service';
import { RenderBitComponent } from './customComponents/renderBit.component';

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
        RenderBitComponent,
        EditComponent,
    ],
    providers: [
        EditService,
    ],
})
export class EditModule {}
