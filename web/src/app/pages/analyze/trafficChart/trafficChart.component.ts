import { Component } from '@angular/core';

import { TrafficChartService } from './trafficChart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss'],
})

export class TrafficChart {

  doughnutData: {};
  totalActivities;


  constructor(private trafficChartService: TrafficChartService) {
    this.doughnutData = trafficChartService.getData().samples;
    this.totalActivities = trafficChartService.getData().totalActivities;
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
