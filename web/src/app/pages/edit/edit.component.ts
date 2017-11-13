import { Component, ViewContainerRef } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { ToastsManager, Toast } from 'ng2-toastr';

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
    activityTypes = [
        { value: 0, title: 'Productiva' },
        { value: 1, title: 'Improductiva' },
        { value: 2, title: 'Colaborativa' },
    ];

    settings = {
        actions: {
            columnTitle: 'Acciones',    
        },
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
                filter: {
                    type: 'list',
                    config: {
                        selectText: 'Todos',
                        list: this.activityTypes,
                    },
                },
                renderComponent: RenderBitComponent,
                editor: {
                    type: 'list',
                    config: {
                        list: this.activityTypes,
                    },
                },
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, protected service: EditService) {
        this.toastr.setRootViewContainerRef(vcr);
        this.service.getActivities().then((data) => {
            this.source.load(data);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    onCreateConfirmActivity(event): void {
        console.debug(JSON.stringify(event.newData));
        this.service.addActivity(event.newData)
        .then(res => {
             if (res.error === 'none') {
                 event.confirm.resolve();
             }else {
                 this.toastr.error('Por favor, compruebe los parámetros.');
                 console.debug(JSON.stringify(res));
                 event.confirm.reject();
             }
         }).catch(this.handleError);
    }

    onEditConfirmActivity(event): void {
        this.service.editActivity(this.service.selectFilters(event.data, event.newData))
        .then(res => {
             if (res.error === 'none') {
                 event.confirm.resolve();
             }else {
                 this.toastr.error('Por favor, compruebe los parámetros.');
                 console.debug(JSON.stringify(res));
                 event.confirm.reject();
             }
         }).catch(this.handleError);
    }

    onDeleteConfirmActivity(event): void {
        if (window.confirm('Seguro que desea eliminar?')) {
            this.service.deleteActivity(event.data)
            .then(res => {
                 if (res.error === 'none') {
                     event.confirm.resolve();
                 }else {
                     this.toastr.error('Por favor, compruebe los parámetros.');
                     console.debug(JSON.stringify(res));
                     event.confirm.reject();
                 }
             }).catch(this.handleError);
        } else {
            event.confirm.reject();
        }
    }
}
