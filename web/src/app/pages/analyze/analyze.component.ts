import { Component, OnInit, AfterViewInit, ViewContainerRef, ContentChildren, QueryList} from '@angular/core';
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
import { TabsComponent } from './tabs';
import { TabComponent } from './tab';
import { RenderBitComponent } from './customComponents/renderBit.component';
import * as Chart from 'chart.js';
import { ChartActivity } from './objects/ChartActivity';

import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../theme';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
    styleUrls: [
        './smartTables.scss',
        './analyze.scss',
    ],
})

export class AnalyzeComponent implements OnInit, AfterViewInit {

    data: any;
    doughnutData: {};
    doughnutDataProduct: {};
    totalActivities;
    totalCollaboratives;
    totalProductives;
    doughnutSummary;
    doughnutDataCollab: {};
    resultado: any;

    layoutColors = this._baConfig.get().colors;
    graphColor = this._baConfig.get().colors.custom.dashboardLineChart;
    lineChart;

    chartData: Object;
    query: string = '';
    activityTypes = [
        { value: 0, title: 'Productiva' },
        { value: 1, title: 'Improductiva' },
        { value: 2, title: 'Colaborativa' },
    ];

    activinames: any ;

    cedula: string = '';
    samplings: any;
    observations: Observation[] = [];
    comments: Comments[] = [];
    selectedSampling: any = {
        name: '',
        description: '',
        modality: {
            data: '',
        },
        type: '',
        sampled: '',
        sampledDescription: '',
        n: -1,
    };

    dataProvided = [
        { date: new Date(2012, 4), value: 2.3 },
        { date: new Date(2012, 6), value: 90.5, comment: 'Se paga bonificación' },
        { date: new Date('2012-07-25T06:00:00.000Z'), value: 46.67 },
        { date: new Date(2012, 10), value: 32.1 },
    ];

    lineChartData = {
        type: 'serial',
        theme: 'black',
        marginTop: 15,
        marginRight: 15,
        responsive: {
            'enabled': false,
        },
        dataProvider: this.dataProvided,
        chartScrollbar: {
            autoGridCount: true,
            graph: 'g1',
            scrollbarHeight: 40,
            oppositeAxis: false,
            color: '#000000',
            offset: 5,
        },
        categoryField: 'date',
        categoryAxis: {
            parseDates: true,
            gridAlpha: 0.1,
            color: '#000',
            axisColor: '#000',
            // title: 'Días',
            minHorizontalGap: 40,
            tickPosition: 'middle',
            tickLength: 5,
        },
        valueAxes: [
            {
                minVerticalGap: 30,
                gridAlpha: 0.1,
                color: this.layoutColors.defaultText,
                axisColor: this.layoutColors.defaultText,
                title: 'Productividad (%)',
                precision: 0,
                guides: [{
                    value: this.dataAverage(),
                    lineAlpha: 100,
                    lineColor: '#a00',
                    inside: true,
                    label: `${Math.floor(this.dataAverage())}%`,
                    position: 'right',
                    dashLength: 30,
                    tickLength: 0,
                }],
            },
        ],
        graphs: [
            {
                id: 'g1',
                bullet: 'round',
                bulletColor: '#00ff99',
                bulletAlpha: 0.9,
                bulletSize: 15,
                useLineColorForBulletBorder: true,
                lineColor: colorHelper.hexToRgbA(this.graphColor, 0.8),
                lineThickness: 3,
                negativeLineColor: this.layoutColors.danger,
                type: 'smoothedLine',
                valueField: 'value',
                colorField: 'color',
                bulletField: 'bullet',
                fillAlphas: 0,
                fillColorsField: 'lineColor',
                balloonText: '[[comment]]',
            },
        ],
        chartCursor: {
            categoryBalloonDateFormat: 'DD MMM YYYY',
            categoryBalloonColor: '#4285F4',
            categoryBalloonAlpha: 0.8,
            categoryBalloonText: '[[category]]',
            valueBalloonsEnabled: false,
            cursorAlpha: 1,
            valuePrecision: 1,
            valueLineBalloonEnabled: false,
            valueLineAlpha: 0.1,
            balloonPointerOrientation: 'vertical',
        },
        dataDateFormat: 'MM YYYY',
        export: {
            enabled: true,
        },
        creditsPosition: 'bottom-right',
        zoomOutButton: {
            backgroundColor: '#fff',
            backgroundAlpha: 0.5,
            color: '#000000',
        },
        zoomOutText: 'Ver todo',
        pathToImages: layoutPaths.images.amChart,
    };

    dataAverage() {
        try {
            const data = this.lineChart.dataProvider;
            let tot = 0;
            for (const v of data) {
                tot += v.value;
            }
            return tot / data.length;
        } catch (e) {
            return 0;
        }
    }

    productivityData: any = this.lineChartData;

    settingsObserv = {
        actions: {
            columnTitle: 'Acciones',
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

    initChart(chart: any) {
        this.lineChart = chart;
    }


    constructor(private _baConfig: BaThemeConfigProvider, public toastr: ToastsManager,
        vcr: ViewContainerRef, private _analyzeService: AnalyzeService,
    ) {
        this.toastr.setRootViewContainerRef(vcr);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    ngOnInit() {
        //AmCharts.addInitHandler(this.productivityChartHandler, ['serial']);
        this.cedula = localStorage.getItem('cedula');
        this.data = this._analyzeService.getAll();
        //carga los muestreos en el select principal
        this._analyzeService.getMySamplings(this.cedula)
        .then(data => {
            this.samplings = data[0];
            this.selectedSampling = this.samplings[0];
            this.loadComments(this.selectedSampling.idSampling);
            //carga los comentarios
            this.InitCharts();
            localStorage.setItem('idSampling', this.selectedSampling.idSampling);
        })
        .catch( this.handleError );
    }

    ngAfterViewInit() {
        this._loadDoughnutCharts();
        this._loadDoughnutChartCollab();
        this._loadDoughnutChartProduct();
    }


    InitCharts() {
      //carga gráfico pastel de actividades improductivas
      const tmp = this._analyzeService.getData(this.selectedSampling.idSampling).then(dataz => {
          this.doughnutData = dataz.samples;
          this.totalActivities = dataz.totalActivities ;
          this._loadDoughnutCharts();

          this._analyzeService.getDataCollab(this.selectedSampling.idSampling)
          .then(datazC => {
              this.doughnutDataCollab = datazC.samples1;
              this.totalCollaboratives = datazC.totalCollaboratives;
              this._loadDoughnutChartCollab();

              this._analyzeService.getDataProduct(this.selectedSampling.idSampling)
              .then(datazP => {
                  this.doughnutDataProduct = datazP.samples2;
                  console.debug(`obss: ${this.doughnutDataProduct}`);
                  this.totalProductives = datazP.totalProductives;

                  this._loadDoughnutChartProduct();
                  this.doughnutSummary = [
                    // {"value":1,"color":"#1b70ef","label":"Viendo el celular","percentage":200,"order":2}
                      {
                        label: 'Productivas',
                        value: this.totalProductives,
                        color: '#1b70ef',
                        percentage: 200,
                        order: 2,
                      },
                      {
                        label: 'Improductivas',
                        value: this.totalActivities,
                        color: '#099',
                        percentage: 200,
                        order: 2,
                      },
                      {
                        label: 'Colaborativas',
                        value: this.totalCollaboratives,
                        color: '#31acbe',
                        percentage: 200,
                        order: 2,
                      },
                  ];
                  this._loadDoughnutChartSummary();
              })
              .catch(this.handleError );
          })
          .catch(this.handleError );
      })
      .catch(this.handleError );

    }


    _loadDoughnutCharts() {
        const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
        console.debug(`productss: ${JSON.stringify(this.doughnutData)}`);
        new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
            segmentShowStroke: false,
            percentageInnerCutout : 64,
            responsive: true,
        });
    }

    _loadDoughnutChartCollab() {
        const ele = jQuery('.chart-area').get(1) as HTMLCanvasElement;
        new Chart(ele.getContext('2d')).Doughnut(this.doughnutDataCollab, {
            segmentShowStroke: false,
            percentageInnerCutout : 64,
            responsive: true,
        });
    }


   _loadDoughnutChartProduct() {
        const elem = jQuery('.chart-area').get(2) as HTMLCanvasElement;
        new Chart(elem.getContext('2d')).Doughnut(this.doughnutDataProduct, {
            segmentShowStroke: false,
            percentageInnerCutout : 64,
            responsive: true,
        });
    }


   _loadDoughnutChartSummary() {
        const elem = jQuery('.chart-area').get(3) as HTMLCanvasElement;
        console.debug(`productss: ${JSON.stringify(this.doughnutSummary)}`);
        new Chart(elem.getContext('2d')).Doughnut(this.doughnutSummary, {
            segmentShowStroke: false,
            percentageInnerCutout : 64,
            responsive: true,
        });
    }

    loadObservations(idSampling): void {
        const samplingId = this.selectedSampling.idSampling;
        this._analyzeService.getObservation(samplingId).then((dataz) => {
            this.observations = dataz;
            this.sourceObserv.load(this.observations);
            this.lineChart.dataProvider = this._analyzeService.getLineChartData(this.observations, this.comments);
            for (const item of this.lineChart.dataProvider) {
              if (item.value && item.comment) {
                item.color = '#b30047';
              }
            }

            this.lineChart.valueAxes[0].guides[0].value = this.dataAverage();
            this.lineChart.valueAxes[0].guides[0].label = `${Math.floor(this.dataAverage())}%`;
            this.lineChart.validateNow(true);

            for (const i of dataz) {
                const n = i.date;
                const timeZoneOffset = new Date().getTimezoneOffset();
                const b = new Date(n);
                i.date = this.renderDate(b.toLocaleString());
            }

            this._analyzeService.getActivityName().then((data) => {
                const acts = [];
                let k = 0;
                for (const i of data) {
                    k++;
                    acts.push({ value: k, title: i.title });
                }

                this.activinames = acts;
                this.sourceObserv.load(dataz);
            }).catch(err => console.debug('Error al cargar las actividades.'));
        }).catch(err => console.debug('Error al cargar las observaciones.'));
    }

    // le da formato a la fecha
    renderDate(pdate) {
        const date = new Date(pdate);
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const year = (`${date.getFullYear()}`);
        const hours = (`0${date.getHours()}`).slice(-2);
        const mins = (`0${date.getMinutes()}`).slice(-2);
        const secs = (`0${date.getSeconds()}`).slice(-2);
        return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
    }

    loadComments(idSampling): void {
        const samplingId = this.selectedSampling.idSampling;
        this._analyzeService.getComments(samplingId).then((data) => {
            for (const i of data) {
                const n = i.date;
                const timeZoneOffset = new Date().getTimezoneOffset();
                const b = new Date(n);
                i.date = this.renderDate(b.toLocaleString());
            }
            this.comments = data;
            this.sourceComment.load(this.comments);
            this.loadObservations(this.selectedSampling.idSampling);
        }).catch(err => console.debug(`Error al cargar los comentarios: ${err}`));

    }
    // carga los nombres del muestreo en el picker superior
    loadSamplingInfo(idSampling): void {
        const updatedSampling = this.getSamplingById(idSampling);
        try {
            // Verifica que la estructura retornada sea correcta
            const modality = updatedSampling.modality.data[0];
            this.selectedSampling = updatedSampling;
            this.loadComments(this.selectedSampling.idSampling);
            //carga gráficos pastel de actividades improductivas
           this.InitCharts();
            localStorage.setItem('idSampling', this.selectedSampling.idSampling);
            // Actualizar datos de observaciones

        } catch (e) {
            console.debug(`Error actualizando muestreo seleccionado: ${e} `);
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
        const idSamp = this.selectedSampling.idSampling;
        this._analyzeService.editObservation(
            this._analyzeService.createComposeEditObservation(idSamp, event.newData),
        )
        .then(res => {
            if (res.error === 'none') {
                event.confirm.resolve();
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                event.confirm.reject();
            }
        }).catch(this.handleError);
    }

    onDeleteConfirm(event): void {
        const idSamp = this.selectedSampling.idSampling;

        this._analyzeService.deleteObservation(
            this._analyzeService.createComposeDeleteObservation(idSamp, event.data.cedula, event.data.date),
        ).then(res => {
            if (res.error === 'none') {
                event.confirm.resolve();
            }else {
                this.toastr.error('Por favor, compruebe los parámetros.');
                event.confirm.reject();
            }
        }).catch(this.handleError);
    }
}
