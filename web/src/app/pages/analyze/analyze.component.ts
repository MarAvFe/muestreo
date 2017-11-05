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
import { RenderBitComponent } from './customComponents/renderBit.component';

import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../theme';

@Component({
    selector: 'analyze',
    templateUrl: './analyze.html',
    styleUrls: [
      './smartTables.scss',
      './lineChart/lineChart.scss',
    ],
})
export class AnalyzeComponent implements OnInit {

    data: any;

    layoutColors = this._baConfig.get().colors;
    graphColor = this._baConfig.get().colors.custom.dashboardLineChart;
    lineChart;

    titles: Titles[];

    getTitles(): void {
        this._analyzeService.getTitles().then(titles => this.titles = titles);
    }

    chartData: Object;
    query: string = '';
    activityTypes = [
        { value: 0, title: 'Productiva' },
        { value: 1, title: 'Improductiva' },
        { value: 2, title: 'Colaborativa' },
    ];
    cedula: string = '';
    samplings: any;
    observations: Observation[] = [];
    selectedSampling: any = {
        name: '',
        description: '',
        modality: {
            data: '',
        },
        type: '',
        sampled: '',
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
          precision: 2,
          guides: [{
            value: this.dataAverage(),
            lineAlpha: 100,
            lineColor: '#a00',
            inside: true,
            label: Math.floor(this.dataAverage()),
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
          fillAlphas: 0,
          fillColorsField: 'lineColor',
          balloonText: '[[comment]]',
        },
      ],
      chartCursor: {
        categoryBalloonDateFormat: 'MMM YYYY',
        categoryBalloonColor: '#4285F4',
        categoryBalloonAlpha: 0.8,
        categoryBalloonText: 'Mes [[category]]',
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
            },
            cedula: {
              title: 'Cédula',
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
            activityname: {
                title: 'Actividad',
                type: 'string',
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
      /*let zoomChart = () => {
        chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
      };

      chart.addListener('rendered', zoomChart);
      zoomChart();

      if (chart.zoomChart) {
        chart.zoomChart();
    }*/
      this.lineChart = chart;

    }

    constructor(private _baConfig: BaThemeConfigProvider, public toastr: ToastsManager,
      settingsvcr: ViewContainerRef, private _analyzeService: AnalyzeService) {
    //    this.toastr.setRootViewContainerRef(vcr);

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
            this.loadObservations(this.selectedSampling.idSampling);
            this.loadComments(this.selectedSampling.idSampling);
        })
        .catch( this.handleError );
    }

    loadObservations(idSampling): void {
     const samplingId = this.selectedSampling.idSampling;
     this._analyzeService.getObservation(samplingId).then((dataz) => {
        this.observations = dataz;
        this.sourceObserv.load(this.observations);
        this.lineChart.dataProvider = this._analyzeService.getLineChartData(this.observations);
        this.lineChart.valueAxes[0].guides[0].value = this.dataAverage();
        this.lineChart.valueAxes[0].guides[0].label = Math.floor(this.dataAverage());
        this.lineChart.validateNow(true);
    }).catch(err => console.debug(`Error al cargar las observaciones: ${err}`));
  }


  loadComments(idSampling): void {
   const samplingId = this.selectedSampling.idSampling;
   console.debug(`IdsamplingComment: ${JSON.stringify(samplingId)}`);
   this._analyzeService.getComments(samplingId).then((data) => {
     this.sourceComment.load(data);
  }).catch(err => console.debug(`Error al cargar los comentarios: ${err}`));

}
    // carga los nombres del muestreo en el picker superior
    loadSamplingInfo(idSampling): void {
        const updatedSampling = this.getSamplingById(idSampling);
        try {
            const modality = updatedSampling.modality.data[0]; // Verifica que la estructura retornada sea correcta
            this.selectedSampling = updatedSampling;
            this.loadObservations(this.selectedSampling.idSampling);
            this.loadComments(this.selectedSampling.idSampling);
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
      this._analyzeService.deleteObservation(this._analyzeService.createComposeDeleteObservation(idSamp, event.newData))
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
