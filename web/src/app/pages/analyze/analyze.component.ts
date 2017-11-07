import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AnalyzeService } from './analyze.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastsManager, Toast } from 'ng2-toastr';
import { Titles } from './Titles';
import { BasicSampling } from './objects/BasicSampling';
import { SamplingType } from './objects/SamplingType';
import { Observation } from './objects/Observation';
import { SamplingId } from './objects/SamplingId';
import { Comments } from './objects/Comments';
import { CollaboratorName } from './objects/CollaboratorName';
import { ActivityName } from './objects/ActivityName';
import { RenderBitComponent } from './customComponents/renderBit.component';
import * as Chart from 'chart.js';
import { ChartActivity } from './objects/ChartActivity';


@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
    styleUrls: ['./smartTables.scss']
})

export class AnalyzeComponent implements OnInit {

    data: any;
    doughnutData: {};
    totalActivities;
    resultado: any;

    titles: Titles[];

    getTitles(): void {
        this._analyzeService.getTitles().then(titles => this.titles = titles);
    }

    query: string = '';
    activityTypes = [
        { value: 0, title: 'Productiva' },
        { value: 1, title: 'Improductiva' },
        { value: 2, title: 'Colaborativa' },
    ];

    activinames: any ;

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

    settingsObserv = {
        actions: {
            add: false,
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
            date: {
                title: 'Fecha',
                type: 'string',
                width: '20px',
            },
            username: {
                title: 'Colaborador',
                type: 'string',
                filter: {
                    type: 'list',
                    config: {
                        selectText: 'Todos',
                        list: this.activityTypes,
                    },
                  },
                  editor: {
                      type: 'list',
                      config: {
                          list: this.activityTypes,
                      },
            },
          },
            cedula: {
              title: 'Cédula',
              type: 'string',
              editable: false,
            },
            type: {
                title: 'Tipo',
                type: 'custom',
                editable: false,
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
            activityname: {
                title: 'Actividad',
                type: 'number',
                filter: {
                    type: 'list',
                    config: {
                        selectText: 'Todos',
                        list: this.activinames,
                    },
                  },
                  renderComponent: RenderBitComponent,
                  editor: {
                      type: 'list',
                      config: {
                          list: this.activinames,
                  },
            },
      },
  },
};

    settingsComment = {
      actions: {
          add: false,
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
          date: {
              title: 'Fecha',
              type: 'string',
          },
          comment: {
            title: 'Comentario',
            type: 'string',
          },

          username: {
              title: 'Autor',
              type: 'string',
          },
        },
    };

    sourceObserv: LocalDataSource = new LocalDataSource();
    sourceComment: LocalDataSource = new LocalDataSource();


    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private _analyzeService: AnalyzeService) {


    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ngOnInit() {

        this.cedula = localStorage.getItem('cedula');
        this.data = this._analyzeService.getAll();
        this.getTitles();
        this._analyzeService.getMySamplings(this.cedula)
        .then(data => {
            this.samplings = data[0];
            this.selectedSampling = this.samplings[0];

            console.debug(`selectedSmapling: ${JSON.stringify(this.selectedSampling)}`);
            console.debug(JSON.stringify(`segfsdsfdgfsdng: ${JSON.stringify(this.selectedSampling.idSampling)}`));
            this.loadObservations(this.selectedSampling.idSampling);
            this.loadComments(this.selectedSampling.idSampling);
            const tmp = this._analyzeService.getData(this.selectedSampling.idSampling).then(dataz => {
                this.doughnutData = dataz.samples;
                this.totalActivities = dataz.totalActivities ;
                this._loadDoughnutCharts();
              })
              .catch(this.handleError );
            console.debug('aqui guardo el id del sampling');
            localStorage.setItem('idSampling', this.selectedSampling.idSampling);
        })
        .catch( this.handleError );
    }

    ngAfterViewInit() {
      this._loadDoughnutCharts();
    }

    private _loadDoughnutCharts() {
      const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
      new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
        segmentShowStroke: true,
        percentageInnerCutout : 64,
        responsive: true,
      });
    }

    loadObservations(idSampling): void {
     const samplingId = this.selectedSampling.idSampling;
     console.debug(`Idsampling: ${JSON.stringify(samplingId)}`);
     this._analyzeService.getObservation(samplingId).then((dataz) => {
       this._analyzeService.getActivityName().then((data) => {
         const acts = [];
         let k = 0;
         for (let i = 0 ; i < data.length; i++) {
             k++;
             acts.push({ value: k, title: data[i].title });
         }

         this.activinames = acts; // no = data
        console.debug(JSON.stringify(this.activinames));
        this.sourceObserv.load(dataz);
       }).catch(err => console.debug('Error al cargar las actividades.'));
    }).catch(err => console.debug('Error al cargar las observaciones.'));
  }

  loadComments(idSampling): void {
   const samplingId = this.selectedSampling.idSampling;
   console.debug(`IdsamplingComment: ${JSON.stringify(samplingId)}`);
   console.debug('kikiikikik');
   this._analyzeService.getComments(samplingId).then((data) => {
     this.sourceComment.load(data);
  }).catch(err => console.debug('Error al cargar los comentarios.'));

}
    //carga los nombres del muestreo en el picker superior
    loadSamplingInfo(idSampling): void {
        const updatedSampling = this.getSamplingById(idSampling);
        try {
            const modality = updatedSampling.modality.data[0]; // Verifica que la estructura retornada sea correcta
            this.selectedSampling = updatedSampling;
            this.loadObservations(this.selectedSampling.idSampling);
            this.loadComments(this.selectedSampling.idSampling);
            localStorage.setItem('idSampling', this.selectedSampling.idSampling);
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

    onEditConfirm(event): void {
        console.debug('entro a editar');
        const idSamp = this.selectedSampling.idSampling;
        console.debug(this.selectedSampling.idSampling);
        this._analyzeService.editObservation(this._analyzeService.createComposeEditObservation(idSamp, event.newData))
        .then(res => {
            if (res.error === 'none') {
                event.confirm.resolve();
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                console.debug(`: ${JSON.stringify(res)}`);
                event.confirm.reject();
            }
        }).catch(this.handleError);
    }

    onDeleteConfirm(event): void {
      const idSamp = this.selectedSampling.idSampling;

      this._analyzeService.deleteObservation(this._analyzeService.createComposeDeleteObservation(idSamp, '301480674',
      '2017-10-30'))
      .then(res => {
          if (res.error === 'none') {
              event.confirm.resolve();
          }else {
              this.toastr.error('Por favor, compruebe los parámetros.');
              console.debug(`: ${JSON.stringify(res)}`);
              event.confirm.reject();
          }
      }).catch(this.handleError);
    }
}
