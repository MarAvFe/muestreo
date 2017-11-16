import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DefParam } from './objects/DefParam';
import { Colaborator } from './objects/Colaborator';
import { PreParam } from './objects/PreParam';
import { Feedback } from './objects/Feedback';
import { SamplingName } from './objects/SamplingName';
import { SamplingType } from './objects/SamplingType';
import { SamplingId } from './objects/SamplingId';
import { SamplingDescIdSamp } from './objects/SamplingDescIdSamp';
import { SampledObjInfo } from './objects/SampledObjInfo';
import { BaThemeConfigProvider } from '../../theme';
import { Globals } from '../Globals';

@Injectable()
export class MySamplingsService {

    options: any;
    heads: any;
    requestOptionsArgs: any;

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

    // desasigna un colaborador de un muestreo
    unassignColaborator(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/unassignColaborator`, body, this.options)
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError);
    }

    // asigna un colaborador a un muestreo
    assignColaborator(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/assignColaborator`, body, this.options)
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError);
    }

   // devuelve el nombre y descripcion del objeto muestreado
   getSampledObjInfo(data): Promise<SampledObjInfo[]> {
       const body = this.glb.toQueryString({ pIdSampling : data });
       console.debug(JSON.stringify(body));
       return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getSampledObjInfo`, body, this.options)
       .toPromise()
       .then(response => response.json().data[0] as SampledObjInfo[])
       .catch(err => this.handleError);
   }

    // devuelve el id del muestreo seleccionado
    getColaborators(data): Promise<Colaborator[]> {
        const body = this.glb.toQueryString({ pNameSampling : data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getColaborators`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Colaborator[])
        .catch(err => this.handleError);
    }

    // devuelve el id del muestreo seleccionado
    getSamplingId(data): Promise<SamplingId[]> {
        const body = this.glb.toQueryString({ pName : data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getSamplingId`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingId[])
        .catch(err => this.handleError);
    }

    getMySamplings(cedula): Promise<any[]> {
        const body = this.glb.toQueryString({ pIdUser: cedula });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getMySamplings`, body, this.options )
        .toPromise()
        .then(response => response.json().data as any[])
        .catch(err => this.handleError);
    }

    getSamplingName(): Promise<SamplingName[]> {
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getSamplingName`, '', this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingName[])
        .catch(err => this.handleError);
    }

    // carga los parámetros definitivos
    getDefParam(data): Promise<DefParam[]> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getDefParam`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as DefParam[])
        .catch(err => this.handleError);
    }

    getSamplingTypes(): Promise<SamplingType[]> {
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/SamplingType/get`, '', this.options )
        .toPromise()
        .then(response => response.json().data as SamplingType[])
        .catch(err => this.handleError);
    }

    // carga los usuarios no colaboradores
    getUsers(data): Promise<Colaborator[]> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getNonColaborators`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Colaborator[])
        .catch(err => this.handleError);
    }

    // carga los parámetros preliminares
    getPreParam(data): Promise<PreParam[]> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getPreParam`, body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as PreParam[])
        .catch(err => this.handleError);
    }

    // hace un update en la tabla de Sampling y la de SampledProfile
    editSamplingDetails(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/pUpdate_SamplingDetails`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    // hace un update de los parámetros definitivos
    editDefParam(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/pUpDefParamsSampling`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    // hace un update de los parámetros preliminares
    editPreParam(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/pUpPreParamsSampling`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    makeDefinitive(data): Promise<Feedback> {
        const body = this.glb.toQueryString({ pIdSampling: data });
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/makeDefinitive`, body, this.options )
        .toPromise()
        .then(response => response.json() as Feedback);
    }

    createComposeSampDetails(info, bodyParams): Object {
      return {pId_Sampling: info.pId_Sampling,
             pSampName: bodyParams.pSampName,
             pSampDescription: bodyParams.pSampDescription,
             pSamplingType: bodyParams.pSamplingType,
             pObjectName: bodyParams.pObjectName,
             pObjectDescription: bodyParams.pObjectDescription,
         };
    }
    // hace un compuesto del idsampling, description, idsamplingtype mas los parámetros que ingresa el usuario
    createComposeDef(info, bodyParams ): Object {
        return {pId_Sampling: info.pId_Sampling,
            pDescription: info.pDescription,
            pIdSamplingType: info.pIdSamplingType,
            perror_definitive: bodyParams.error_definitive,
            pn_definitive: bodyParams.n_definitive,
            pz_definitive: bodyParams.z_definitive,
        };
    }


    // hace un compuesto del idsampling, description, idsamplingtype mas los parámetros que ingresa el usuario
    createComposePre( info, bodyParams ): Object {
      //  console.log("po"+bodyParams);
        return {
            pId_Sampling: info.pId_Sampling,
            pDescription: info.pDescription,
            pIdSamplingType: info.pIdSamplingType,
            perror_preliminar: bodyParams.error_preliminar,
            pn_preliminar: bodyParams.n_preliminar,
        };
    }

    selectFilters(bef: Object, aft: Object) {
        // Update ws function updates fields, filtering on the unchanged fields.
        // The filter includes an 'f_' before the name (f_name).
        // This function receives the before and after updating values, and adds the 'f_'
        //   before the field name to define filters.
        // bef : {"name": "nombre","description": "descrip."} ->
        // aft : {"name": "nombre","description": "updated"} ->
        // ret : {"fname": "nombre","fdescription": "descrip.","description": "updated"}
        const ret = new Object();
        const filterPrefix = 'f_';
        const keys = Object.keys(bef).map(key => {
            ret[key] = aft[key];
            ret[filterPrefix + key] = bef[key];
        });
        return ret;
    }
}
