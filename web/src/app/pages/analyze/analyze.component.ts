import { Component, OnInit } from '@angular/core';

import { AnalyzeService } from './analyze.service';
import { LocalDataSource } from 'ng2-smart-table';

import { Titles } from './Titles';
import { BasicSampling } from './objects/BasicSampling';
import { SamplingType } from './objects/SamplingType';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
})
export class AnalyzeComponent implements OnInit {

    data: any;

    titles: Titles[];

    getTitles(): void {
        this._analyzeService.getTitles().then(titles => this.titles = titles);
    }

    query: string = '';
    cedula: string = '';
    samplings: any;
    selectedSampling: any = {
        name: '',
        description: '',
        modality: {
            data: '',
        },
        type: '',
        sampled: '',
    };

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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        this.data = this._analyzeService.getAll();
        this.getTitles();

        this._analyzeService.getMySamplings(this.cedula)
        .then(data => {
            this.samplings = data[0];
            this.selectedSampling = this.samplings[0];
            console.debug(`selectedSmapling: ${JSON.stringify(this.selectedSampling)}`);
        })
        .catch( this.handleError );
    }

    loadSamplingInfo(idSampling): void {
        const updatedSampling = this.getSamplingById(idSampling);
        try {
            const modality = updatedSampling.modality.data[0]; // Verifica que la estructura retornada sea correcta
            this.selectedSampling = updatedSampling;

            // Actualizar datos de observaciones
        } catch (e) {
            console.debug('Error actualizando muestreo seleccionado.');
        }
    }

    getSamplingById(idSampling): any {
        for (const s of this.samplings) {
            if (JSON.stringify(s.idSampling) === idSampling) {
                return s;
            }
        }
        return {};
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
