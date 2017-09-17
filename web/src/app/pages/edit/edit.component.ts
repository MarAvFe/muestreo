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
            type: {
                title: 'Tipo',
                type: 'custom',
                renderComponent: RenderBitComponent,
                editor: {
                    type: 'list',
                    config: {
                        list: [
                            { value: 0, title: 'Productiva' },
                            { value: 1, title: 'Improductiva' },
                            { value: 2, title: 'Colaborativa' },
                        ],
                    },
                },
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(protected service: EditService) {
        this.service.getActivities().then((data) => {
            this.source.load(data);
        });
    }

    onCreateConfirmActivity(event): void {
        console.debug(JSON.stringify(event.newData));
        this.service.addActivity(event.newData)
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

    onEditConfirmActivity(event): void {
        this.service.editActivity(this.service.selectFilters(event.data, event.newData))
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

    onDeleteConfirmActivity(event): void {
        if (window.confirm('Seguro que desea eliminar?')) {
            this.service.deleteActivity(event.data)
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
