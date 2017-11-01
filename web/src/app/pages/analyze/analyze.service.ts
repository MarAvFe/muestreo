import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BaThemeConfigProvider } from '../../theme';

import { Titles } from './Titles';
import { BasicSampling } from './objects/BasicSampling';
import { SamplingType } from './objects/SamplingType';
import { Observation } from './objects/Observation';
import { SamplingId } from './objects/SamplingId';
import { Feedback } from './objects/Feedback';
import { Comments } from './objects/Comments';
import { ObservationID } from './objects/ObservationID';

@Injectable()
export class AnalyzeService {

    options: any;
    heads: any;

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

    };

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {
      this.heads = new Headers();
      this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
      this.heads.append('Access-Control-Allow-Origin', '*');
      this.heads.append('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
      this.options = { headers : this.heads, withCredentials : true };
    }

    // devuelve el id del muestreo seleccionado
    getSamplingId(data): Promise<SamplingId[]> {
        const body = this.toQueryString({ pName : data });
        return this.http.post('http://localhost:2828/getSamplingId', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingId[])
        .catch(this.handleError);
    }

     //lista los comentario pertenecientes a un muestreo
     getComments(data): Promise<Comments[]> {
         const body = this.toQueryString( { pIdSampling: data });
        console.debug(JSON.stringify('body comment'));
         console.debug(JSON.stringify(body));
         return this.http.post('http://localhost:2828/getComments', body, this.options )
         .toPromise()
         .then(response => response.json().data[0] as Comments[])
         .catch(this.handleError);
     }

    //lista las observaciones pertenecientes a un muestreo
    getObservation(data): Promise<Observation[]> {
        const body = this.toQueryString( { pIdSampling: data });
        console.debug(JSON.stringify(body));
        return this.http.post('http://localhost:2828/getObservations', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Observation[])
        .catch(this.handleError);
    }
    //edita una observacion
    editObservation(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        console.debug(JSON.stringify(body));
        return this.http.post('http://localhost:2828/pUpdateObservation', body, this.options )
        .toPromise()
        .then(response => response.json());
    }
    //elimina una observacion
    deleteObservation(data): Promise<Feedback> {
        const body = this.toQueryString(data);
              console.debug(JSON.stringify('eliminadno body'));
              console.debug(JSON.stringify(body));
        return this.http.post('http://localhost:2828/pDeleteObservation', body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    getObservationId(data): Promise<ObservationID[]> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/getObservationId', body, this.options )
        .toPromise()
        .then(response => response.json().data as ObservationID[])
        .catch(this.handleError);
    }


    getMySamplings(cedula): Promise<BasicSampling[]> {
        const body = this.toQueryString({ pIdUser: cedula });
        return this.http.post('http://localhost:2828/getMySamplings', body, this.options )
        .toPromise()
        .then(response => response.json().data as BasicSampling[])
        .catch(this.handleError);
    }

    getSamplingTypes(): Promise<SamplingType[]> {
        return this.http.post('http://localhost:2828/SamplingType/get', '', this.options )
        .toPromise()
        .then(response => response.json().data as SamplingType[])
        .catch(this.handleError);
    }

    getAll() {
        return this._data;
    }

    getData(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            //    resolve(this._data.observationsData);
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

    createComposeEditObservation(info, bodyParams): Object {
      return {pIdSampling: info,
             pDate: bodyParams.date,
             pUsername: bodyParams.username,
             pCedula: bodyParams.cedula,
             pActivityType: bodyParams.type,
             pActivityName: bodyParams.activityname,
         };
    }

    createComposeDeleteObservation(info, bodyParams, bodyParams1): Object {
      return {pIdSampling: info,
             pcedula: bodyParams,
             pdate: bodyParams1,
         };
    }

    private toQueryString(jsonBody: Object) {
        // Receives some json and returns it in ws query format:
        // {"name": "nombre","description": "descrip."} -> name=nombre&description=descrip
          console.debug('hhhhhhhhhhhhhhhhhhhhhhhh');
        console.debug(jsonBody);
        const keys = Object.keys(jsonBody).map(key => {
            /* If boolean */
            if (jsonBody[key] === 'false' || jsonBody[key] === 'true' ) {
                jsonBody[key] = jsonBody[key] === 'true' ? 1 : 0;
            }
            /* If bit {"type": "Buffer","data": [1]} */
            if (jsonBody[key].type ) {
                jsonBody[key] = jsonBody[key].data[0];
            }
            return [key, jsonBody[key]].join('=');
        });
        const str = keys.join('&');
        return str;
    }
}
