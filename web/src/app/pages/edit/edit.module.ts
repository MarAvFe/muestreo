import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
