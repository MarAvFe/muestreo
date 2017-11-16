import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { BaThemeConfigProvider , colorHelper } from '../../theme';

import { Titles } from './Titles';
import { BasicSampling } from './objects/BasicSampling';
import { SamplingType } from './objects/SamplingType';
import { Observation } from './objects/Observation';
import { SamplingId } from './objects/SamplingId';
import { Feedback } from './objects/Feedback';
import { Comments } from './objects/Comments';
import { CollaboratorName } from './objects/CollaboratorName';
import { ActivityName } from './objects/ActivityName';
import { ObservationID } from './objects/ObservationID';
import { ImproductiveAct } from './objects/ImproductiveAct';
import { CollaborativeAct } from './objects/CollaborativeAct';
import { ProductiveAct } from './objects/ProductiveAct';
import { ChartActivity } from './objects/ChartActivity';
import { ChartCollab } from './objects/ChartCollab';
import { Globals } from '../Globals';

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
            labels: [
                0, 1,
            ],
            series: [[
                5, 67.4,
            ]],
        },
        productivityOptions: {
            color: '#000',
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

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http, private glb: Globals) {
        this.heads = new Headers();
        this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
        this.heads.append('Access-Control-Allow-Origin', '*');
        this.heads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
        this.options = { headers : this.heads, withCredentials : true };
    }

    getProductiveActs(data): Promise<ProductiveAct[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getProductiveAct`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as ProductiveAct[])
        .catch(this.handleError);
    }

    getImproductiveActs(data): Promise<ImproductiveAct[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getImproductiveAct`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as ImproductiveAct[])
        .catch(this.handleError);
    }

    getCollaborativeActs(data): Promise<CollaborativeAct[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getCollaborativeAct`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as CollaborativeAct[])
        .catch(this.handleError);
    }

    dashboardColors = this._baConfig.get().colors.dashboard;

    colors = [
        this.dashboardColors.lightblue1, this.dashboardColors.silverTree, this.dashboardColors.gossip,
        this.dashboardColors.surfieGreen, this.dashboardColors.blueStone, this.dashboardColors.darkblue1,
        this.dashboardColors.white, this.dashboardColors.lightblue2, this.dashboardColors.purple1,
        this.dashboardColors.purple2, this.dashboardColors.green1, this.dashboardColors.darkblue2,
        this.dashboardColors.lightgreen1, this.dashboardColors.darkgreen1, this.dashboardColors.darkgreen2,
        this.dashboardColors.lightblue3, this.dashboardColors.lightpurple1, this.dashboardColors.lightpurple2,
        this.dashboardColors.blue1, this.dashboardColors.darkblue3,
    ];


    getData(data): Promise<{totalActivities: number, samples: ChartActivity[]}> {
        return this.getImproductiveActs(data).then( res => {
            let k = 0;
            let colr;
            const chartActs: ChartActivity[] = [];
            for (let i = 0; i < res.length; i++) {
                k += res[i].num;
                if (i < this.colors.length) {
                    colr = this.colors[i];
                } else if (i < this.colors.length * 2) {
                    colr = colorHelper.shade(this.colors[i], 20);
                } else if (i < this.colors.length * 3) {
                    colr = colorHelper.shade(this.colors[i], 20);
                }
                const tmp: any = {
                    value: res[i].num,
                    color: this.colors[ i % this.colors.length],
                    highlight: this.colors[colr % this.colors.length],
                    label : res[i].name,
                    percentage: 200,
                    order : 2,
                };
                chartActs.push(tmp as ChartActivity);
            }
              console.debug(JSON.stringify('IMPRODUCTIVAS'));
            console.debug(JSON.stringify(chartActs));

            return { samples: chartActs, totalActivities: k };
        }).catch(this.handleError);
    }

    getDataCollab(data): Promise<{totalCollaboratives: number, samples1: ChartCollab[]}> {
        return this.getCollaborativeActs(data).then( res => {
            let k = 0;
            let colr;
            const chartColl: ChartCollab[] = [];
            for (let i = 0; i < res.length; i++) {
                k += res[i].num;

                if (i < this.colors.length) {
                    colr = this.colors[i];
                } else if (i < this.colors.length * 2) {
                    colr = colorHelper.shade(this.colors[i], 20);
                } else if (i < this.colors.length * 3) {
                    colr = colorHelper.shade(this.colors[i], 20);
                }
                const tmp1: any = {
                    value: res[i].num,
                    color: this.colors[ i % this.colors.length],
                    highlight: this.colors[colr % this.colors.length],
                    label : res[i].name,
                    percentage: 200,
                    order : 2,
                };
                chartColl.push(tmp1 as ChartCollab);
            }
                console.debug(JSON.stringify('COLABORATIVAS'));
              console.debug(JSON.stringify(chartColl));
            return { samples1: chartColl, totalCollaboratives: k };
        }).catch(this.handleError);
    }

    getDataProduct(data): Promise<{totalProductives: number, samples2: ChartActivity[]}> {
        return this.getProductiveActs(data).then( res => {
            let k = 0;
            let colr;
            const chartProduct: ChartActivity[] = [];
            for (let i = 0; i < res.length; i++) {
                k += res[i].num;
                if (i < this.colors.length) {
                    colr = this.colors[i];
                } else if (i < this.colors.length * 2) {
                    colr = colorHelper.shade(this.colors[i], 20);
                } else if (i < this.colors.length * 3) {
                    colr = colorHelper.shade(this.colors[i], 20);
                }
                const tmp2: any = {
                    value: res[i].num,
                    color: this.colors[ i % this.colors.length],
                    highlight: this.colors[colr % this.colors.length],
                    label : res[i].name,
                    percentage: 200,
                    order : 2,
                };
                chartProduct.push(tmp2 as ChartActivity);
            }
            console.debug(JSON.stringify('PRODUCTIVAS'));

            console.debug(JSON.stringify(chartProduct));
            return { samples2: chartProduct, totalProductives: k };
        }).catch(this.handleError);
    }

    // devuelve el id del muestreo seleccionado
    getSamplingId(data): Promise<SamplingId[]> {
        const body = this.glb.toQueryString({ pName : data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getSamplingId`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingId[])
        .catch(this.handleError);
    }

    // lista los comentario pertenecientes a un muestreo
    getComments(data): Promise<Comments[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getComments`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Comments[])
        .catch(this.handleError);
    }

    // lista las observaciones pertenecientes a un muestreo
    getObservation(data): Promise<Observation[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getObservations`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Observation[])
        .catch(this.handleError);
    }

    // lista las observaciones pertenecientes a un muestreo
    getCollaboratorName(data): Promise<CollaboratorName[]> {
        const body = this.glb.toQueryString( { pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getCollaboratorName`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as CollaboratorName[])
        .catch(this.handleError);
    }

    // lista las observaciones pertenecientes a un muestreo
    getActivityName(): Promise<ActivityName[]> {
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getActivityName`, '', this.options )
        .toPromise()
        .then(response => response.json().data[0] as ActivityName[])
        .catch(this.handleError);
    }

    // edita una observacion
    editObservation(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/pUpdateObservation`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }
    // elimina una observacion
    deleteObservation(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
              console.debug(JSON.stringify('eliminadno body'));
              console.debug(JSON.stringify(body));
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/pDeleteObservation`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    getObservationId(data): Promise<ObservationID[]> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getObservationId`, body, this.options )
        .toPromise()
        .then(response => response.json().data as ObservationID[])
        .catch(this.handleError);
    }

    getMySamplings(cedula): Promise<any[]> {
        const body = this.glb.toQueryString({ pIdUser: cedula });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getMySamplings`, body, this.options )
        .toPromise()
        .then(response => response.json().data as BasicSampling[])
        .catch(this.handleError);
    }

    getSamplingTypes(): Promise<SamplingType[]> {
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/SamplingType/get`, '', this.options )
        .toPromise()
        .then(response => response.json().data as SamplingType[])
        .catch(this.handleError);
    }

    getAll() {
        return this._data;
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
            pActivityName: bodyParams.activityname,
        };
    }

    createComposeDeleteObservation(info, bodyParams, bodyParams1): Object {
        return {pIdSampling: info,
            pcedula: bodyParams,
            pdate: bodyParams1,
        };
    }

    getLineChartData(observations: Observation[], comments: Comments[]): Object {
        return this.getSummarizedObservations(observations, comments);
    }

    getSummarizedObservations(observations: Observation[], comments: Comments[]): any {
        // {"date":"2017-10-31T06:00:00.000Z","username":"Andrea","cedula":"301480674","type":2,
        //   "activityname":"Sosteniendo escalera"}
        // { date: new Date(2014, 4), value: 44.92 }
        const data: { date, value }[] = [];
        const historicVals = [];
        const resultingData = [];
        let holdDate: string;
        let tmp = this.sameDates(observations);
        while (tmp.result.length > 0) {
            let val = 0;
            let numVals = 0;
            for (const s of tmp.result) {
                numVals++;
                if (s.type === 0) {
                    val++;
                }
            }
            holdDate = tmp.result[0].date;
            const prepObj: any = {
                date: new Date(
                    parseInt(holdDate.substring(0, 4)),
                    parseInt(holdDate.substring(5, 7)) - 1,
                    parseInt(holdDate.substring(8, 10)),
                ),
                value: (val / numVals) * 100,
            };
            prepObj.comment = this.getDayComments(holdDate, comments);
            resultingData.push(prepObj);
            tmp = this.sameDates(tmp.dif);
        }
        return resultingData;
    }

    private getDayComments(date, comments) {
        let res = '';
        for (const c of comments) {
            if (c.date.substring(0, 10) === date.substring(0, 10)) {
                res += c.comment;
            }
        }
        if (res !== '') {
            return res;
        }
    }

    private sameDates(obs): { result: Observation[], dif: Observation[] } {
        const result = [];
        const dif = [];
        if (obs) {
            const pivot = obs[0];
            for (const d of obs) {
                if (d.date.substring(0, 10) === pivot.date.substring(0, 10)) {
                    result.push(d);
                } else {
                    dif.push(d);
                }
            }
            return { result, dif };
        } else {
            console.debug(`ERR: sameDates`);
        }
    }
}
