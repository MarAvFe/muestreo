import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BaThemeConfigProvider } from '../../theme';

import { Titles } from './Titles';

@Injectable()
export class AnalyzeService {

    private titlesUrl = 'assets/titles.json';

    getTitles(): Promise<Titles[]> {
        return this.http.get(this.titlesUrl)
                   .toPromise()
                   .then(response => response.json().data as Titles[])
                   .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    private _data = {

        productivityData: {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
            series: [
                [5, 67.4, 36.5, 44.2, 55.5, 47.4, 55.166666666666664, 50.857142857142854,
                    52.375, 54.111111111111114, 58.3, 53.72727272727273, 51.916666666666664,
                    53.46153846153846, 49.785714285714285, 48.333333333333336, 45.75,
                    44.76470588235294, 46.22222222222222, 46.526315789473685, 47.25,
                    48.38095238095238, 46.5, 47.30434782608695, 45.916666666666664,
                    44.6, 43.57692307692308, 42.851851851851855, 43.92857142857143,
                    44.689655172413794, 46.53333333333333, 47.354838709677416, 46.09375,
                    46.666666666666664, 46.970588235294116, 45.74285714285714,
                    44.94444444444444, 44.513513513513516, 45.18421052631579,
                    45.205128205128204, 44.525, 44.63414634146341, 43.904761904761905,
                    43.53488372093023, 43.38636363636363, 43.022222222222226,
                    42.130434782608695, 41.851063829787236, 41.791666666666664,
                    42.673469387755105],
            ],
        },
        productivityOptions: {
            color: this._baConfig.get().colors.defaultText,
            fullWidth: true,
            height: '300px',
            chartPadding: {
                right: 40,
            },
        },
        improductivitiesData: {
            labels: ['Esperando', 'WC', 'Comiendo', 'Caminando', 'Otros'],
            series: [12, 8, 6, 15, 9],
        },
        improductivitiesOptions: {
            fullWidth: true,
            donut: true,
            height: '300px',
            weight: '300px',
            labelDirection: 'explode',
            labelInterpolationFnc(value) {
                return value;
            },
        },
        observationsData: [
            {
                date: '3-oct-2017',
                colaborator: 'Marco Tulio',
                type: 'Improductiva',
                activity: 'Comiendo',
            },
        ],
    };

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {
    }

    getAll() {
        return this._data;
    }

    getData(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this._data.observationsData);
            }, 2000);
        });
    }

    getResponsive(padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc (value) {
                    return value;
                },
            }],
            ['screen and (max-width: 1200px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc (value) {
                    return value;
                },
            }],
            ['screen and (max-width: 600px)', {
                chartPadding: 0,
                labelOffset: 0,
                labelInterpolationFnc (value) {
                    return value[0];
                },
            }],
        ];
    }
}
