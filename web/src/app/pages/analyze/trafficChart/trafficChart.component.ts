import { Component } from '@angular/core';

import { TrafficChartService } from './trafficChart.service';
import * as Chart from 'chart.js';
import { ChartActivity } from './Objects/ChartActivity';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss'],
})

export class TrafficChart {

  doughnutData: {};
  totalActivities;
  resultado: any;

  constructor(private trafficChartService: TrafficChartService) {
    const idSamp = localStorage.getItem('idSampling');
    console.debug('que pereza');
    console.debug(idSamp);
  /*  this.trafficChartService.getData(idSamp).then(data => {
      this.doughnutData = data.samples;
      this.totalActivities = data.totalActivities;
      this._loadDoughnutCharts();
    })
    .catch(this.handleError );
  }*/
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true,
    });
  }
}
