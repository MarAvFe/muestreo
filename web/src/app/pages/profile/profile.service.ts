import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaThemeConfigProvider } from '../../theme';
import { SamplingType } from './SamplingType';
import { Feedback } from './Feedback';
import { BasicSampling } from './BasicSampling';
import { FormatService } from '../../services/FormatService';

@Injectable()
export class ProfileService {

    heads: any;

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {
        this.heads = new Headers();
        this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
        this.heads.append('Access-Control-Allow-Origin', '*');
        this.heads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    createBasicSampling(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/createBasicSampling', body, { headers : this.heads } )
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getBasicSamplings(): Promise<BasicSampling[]> {
        return this.http.post('http://localhost:2828/Sampling/get', { headers : this.heads } )
        .toPromise()
        .then(response => response.json().data as BasicSampling[])
        .catch(this.handleError);
    }

    getSamplingTypes(): Promise<SamplingType[]> {
        return this.http.post('http://localhost:2828/SamplingType/get', { headers : this.heads } )
        .toPromise()
        .then(response => response.json().data as SamplingType[])
        .catch(this.handleError);
    }

    getResponsive(padding, offset) {
        return [
            ['screen and (min-width: 1550px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc(value) {
                    return value;
                },
            }],
            ['screen and (max-width: 1200px)', {
                chartPadding: padding,
                labelOffset: offset,
                labelDirection: 'explode',
                labelInterpolationFnc(value) {
                    return value;
                },
            }],
            ['screen and (max-width: 600px)', {
                chartPadding: 0,
                labelOffset: 0,
                labelInterpolationFnc(value) {
                    return value[0];
                },
            }],
        ];
    }

    private toQueryString(jsonBody: Object) {
        // Receives some json and returns it in ws query format:
        // {"name": "nombre","description": "descrip."} -> name=nombre&description=descrip
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
