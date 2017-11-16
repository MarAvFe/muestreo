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

@Injectable()
export class MySamplingsService {

    options: any;
    heads: any;
    requestOptionsArgs: any;

    constructor(private _baConfig: BaThemeConfigProvider, private http: Http) {
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
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/unassignColaborator', body, this.options )
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError);
    }

    // asigna un colaborador a un muestreo
    assignColaborator(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/assignColaborator', body, this.options )
        .toPromise()
        .then(response => response.json())
        .catch(err => this.handleError);
    }

   //devuelve el nombre y descripcion del objeto muestreado
   getSampledObjInfo(data): Promise<SampledObjInfo[]> {
       const body = this.toQueryString({ pIdSampling : data });
       console.log(JSON.stringify(body));
       return this.http.post('http://localhost:2828/getSampledObjInfo', body, this.options )
       .toPromise()
       .then(response => response.json().data[0] as SampledObjInfo[])
       .catch(err => this.handleError);
   }

    // devuelve el id del muestreo seleccionado
    getColaborators(data): Promise<Colaborator[]> {
        const body = this.toQueryString({ pNameSampling : data });
        return this.http.post('http://localhost:2828/getColaborators', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Colaborator[])
        .catch(err => this.handleError);
    }

    // devuelve el id del muestreo seleccionado
    getSamplingId(data): Promise<SamplingId[]> {
        const body = this.toQueryString({ pName : data });
        return this.http.post('http://localhost:2828/getSamplingId', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingId[])
        .catch(err => this.handleError);
    }

    getMySamplings(cedula): Promise<any[]> {
        const body = this.toQueryString({ pIdUser: cedula });
        return this.http.post('http://localhost:2828/getMySamplings', body, this.options )
        .toPromise()
        .then(response => response.json().data as any[])
        .catch(err => this.handleError);
    }

    getSamplingName(): Promise<SamplingName[]> {
        return this.http.post('http://localhost:2828/getSamplingName', '', this.options )
        .toPromise()
        .then(response => response.json().data[0] as SamplingName[])
        .catch(err => this.handleError);
    }

    // carga los parámetros definitivos
    getDefParam(data): Promise<DefParam[]> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/getDefParam', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as DefParam[])
        .catch(err => this.handleError);
    }

    getSamplingTypes(): Promise<SamplingType[]> {
        return this.http.post('http://localhost:2828/SamplingType/get', '', this.options )
        .toPromise()
        .then(response => response.json().data as SamplingType[])
        .catch(err => this.handleError);
    }

    // carga los usuarios no colaboradores
    getUsers(data): Promise<Colaborator[]> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/getNonColaborators', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as Colaborator[])
        .catch(err => this.handleError);
    }

    // carga los parámetros preliminares
    getPreParam(data): Promise<PreParam[]> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/getPreParam', body, this.options )
        .toPromise()
        .then(response => response.json().data[0] as PreParam[])
        .catch(err => this.handleError);
    }

    //hace un update en la tabla de Sampling y la de SampledProfile
    editSamplingDetails(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/pUpdate_SamplingDetails', body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    // hace un update de los parámetros definitivos
    editDefParam(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/pUpDefParamsSampling', body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    // hace un update de los parámetros preliminares
    editPreParam(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/pUpPreParamsSampling', body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    makeDefinitive(data): Promise<Feedback> {
        const body = this.toQueryString({
            pIdSampling: data.idSampling,
            pN: data.n, 
        });
        return this.http.post('http://localhost:2828/makeDefinitive', body, this.options )
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

    private toQueryString(jsonBody: Object) {
        // Receives some json and returns it in ws query format:
        // {"name": "nombre","description": "descrip."} -> name=nombre&description=
        const keys = Object.keys(jsonBody).map(key => {
            /* If null */
            if (!jsonBody[key]) {
                return '';
            }
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
