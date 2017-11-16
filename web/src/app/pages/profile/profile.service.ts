import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaThemeConfigProvider } from '../../theme';
import { SamplingType } from './SamplingType';
import { Feedback } from './Feedback';
import { BasicSampling } from './BasicSampling';
import { User } from './objects/User';
import { FormatService } from '../../services/FormatService';
import { Globals } from '../Globals';

@Injectable()
export class ProfileService {

    options: any;
    heads: any;

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http, private glb: Globals) {
        this.heads = new Headers();
        this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
        this.heads.append('Access-Control-Allow-Origin', '*');
        this.heads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
        this.options = { headers : this.heads, withCredentials : true };
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    createBasicSampling(cedula, data): Promise<Feedback> {
        data.pCedula = cedula;
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/createBasicSampling`, body, this.options )
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getUser(cedula: string): Promise<User> {
        const body = this.glb.toQueryString({ cedula });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/User/get`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as User)
        .catch(this.handleError);
    }

    getMySamplings(cedula): Promise<BasicSampling[]> {
        const body = this.glb.toQueryString({ pIdUser: cedula });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getMySamplings`, body, this.options )
        .toPromise()
        .then(response => response.json().data as BasicSampling[])
        .catch(this.handleError);
    }

    getThemSamplings(cedula): Promise<BasicSampling[]> {
        const body = this.glb.toQueryString({ pIdUser: cedula });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getThemSamplings`, body, this.options )
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
}
