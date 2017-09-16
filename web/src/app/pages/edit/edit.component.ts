import { Component } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

import { EditService } from './edit.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RenderBitComponent } from './customComponents/renderBit.component';

@Component({
    selector: 'edit',
    templateUrl: './edit.html',
    styleUrls: ['./smartTables.scss'],
})
export class EditComponent {

    query: string = '';

    settings = {
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
            createButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true,
        },
        columns: {
            name: {
                title: 'Nombre',
                type: 'string',
            },
            description: {
                title: 'Descripción',
                type: 'string',
            },
            isCollaborative: {
                title: 'Es colaborativa?',
                type: 'custom',
                renderComponent: RenderBitComponent,
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            { value: 'true', title: 'No' },
                            { value: 'false', title: 'Si' },
                        ],
                    },
                },
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(protected service: EditService) {
        this.service.getImprodActs().then((data) => {
            this.source.load(data);
        });
    }

    onCreateConfirmImprodAct(event): void {
        this.service.addImprodAct(event.newData)
        .then(res => {
             if (res.error === 'none') {
                 event.confirm.resolve();
             }else {
                 console.debug/*errorModal(*/('Por favor, compruebe los parámetros.');
                 console.debug(JSON.stringify(res));
                 event.confirm.reject();
             }
         },
        );
    }

    onEditConfirmImprodAct(event): void {
        this.service.editImprodAct(this.service.selectFilters(event.data, event.newData))
        .then(res => {
             if (res.error === 'none') {
                 event.confirm.resolve();
             }else {
                 console.debug/*errorModal(*/('Por favor, compruebe los parámetros.');
                 console.debug(JSON.stringify(res));
                 event.confirm.reject();
             }
         },
        );
    }

    onDeleteConfirmImprodAct(event): void {
        if (window.confirm('Seguro que desea eliminar?')) {
            this.service.deleteImprodAct(event.data)
            .then(res => {
                 if (res.error === 'none') {
                     event.confirm.resolve();
                 }else {
                     console.debug/*errorModal(*/('Por favor, compruebe los parámetros.');
                     console.debug(JSON.stringify(res));
                     event.confirm.reject();
                 }
             },
            );
        } else {
            event.confirm.reject();
        }
    }
}
