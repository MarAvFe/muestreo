import { Component } from '@angular/core';

import { AnalyzeService } from './analyze.service';
import { LocalDataSource } from 'ng2-smart-table';

import { Titles } from './Titles';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
})
export class AnalyzeComponent {

    data: any;

    titles: Titles[];

    getTitles(): void {
        this._analyzeService.getTitles().then(titles => this.titles = titles);
    }

    query: string = '';

    settings = {
        actions: {
            add: false,
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true,
        },
        columns: {
            date: {
                title: 'Fecha',
                type: 'string',
                width: '20px',
            },
            colaborator: {
                title: 'Colaborador',
                type: 'string',
            },
            type: {
                title: 'Tipo',
                type: 'string',
            },
            activity: {
                title: 'Actividad',
                type: 'string',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private _analyzeService: AnalyzeService) {
        this._analyzeService.getData().then((data) => {
            this.source.load(data);
        });
    }

    ngOnInit() {
        this.data = this._analyzeService.getAll();
        this.getTitles();
    }

    getResponsive(padding, offset) {
        return this._analyzeService.getResponsive(padding, offset);
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }
}
