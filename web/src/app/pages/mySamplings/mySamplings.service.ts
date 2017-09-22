import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {DefParam} from './objects/DefParam'
import { PreParam } from './objects/PreParam';
import { Feedback } from './objects/Feedback';
import { SamplingName } from './objects/SamplingName';
import { BaThemeConfigProvider } from '../../theme';

@Injectable()
export class MySamplingsService {

  heads: any;
  requestOptionsArgs: any;


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


  getSamplingName(): Promise<SamplingName[]> {
      return this.http.post('http://localhost:2828/getSamplingName', { headers : this.heads } )
                 .toPromise()
                 .then(response => response.json().data[0] as SamplingName[])
                 .catch(this.handleError);
  }
  // carga los parámetros definitivos
    getDefParam(data): Promise<DefParam[]> {
      const body = this.toQueryString(data);
      return this.http.post('http://localhost:2828/getDefParam', body, { headers : this.heads } )
      .toPromise()
      .then(response => response.json().data[0] as DefParam[])
      .catch(this.handleError);
    }

// carga los parámetros preliminares
  getPreParam(data): Promise<PreParam[]> {
    const body = this.toQueryString(data);
    return this.http.post('http://localhost:2828/getPreParam', body, { headers : this.heads } )
    .toPromise()
    .then(response => response.json().data[0] as PreParam[])
    .catch(this.handleError);
  }


  // hace un update de los parámetros definitivos
    editDefParam(data): Promise<Feedback> {
      const body = this.toQueryString(data);
      return this.http.post('http://localhost:2828/pUpDefParamsSampling', body, { headers : this.heads } )
      .toPromise()
      .then(response => response.json());
    }

// hace un update de los parámetros preliminares
  editPreParam(data): Promise<Feedback> {
    const body = this.toQueryString(data);
    return this.http.post('http://localhost:2828/pUpPreParamsSampling', body, { headers : this.heads } )
    .toPromise()
    .then(response => response.json());
  }

  // hace un compuesto del idsampling, description, idsamplingtype mas los parámetros que ingresa el usuario
    createComposeDef(info, bodyParams ): Object {
      console.debug(info);
      console.debug(bodyParams);
     return {pId_Sampling: info.pId_Sampling, pDescription: info.pDescription, pIdSamplingType: info.pIdSamplingType,
       pp_definitive: bodyParams.p_definitive,pq_definitive: bodyParams.q_definitive,
       perror_definitive: bodyParams.error_definitive,
       pn_definitive: bodyParams.n_definitive, pz_definitive: bodyParams.z_definitive};
    }


// hace un compuesto del idsampling, description, idsamplingtype mas los parámetros que ingresa el usuario
  createComposePre(info, bodyParams ): Object {
    console.debug(info);
    console.debug(bodyParams);
   return {pId_Sampling: info.pId_Sampling, pDescription: info.pDescription, pIdSamplingType: info.pIdSamplingType,
     pp_preliminar: bodyParams.p_preliminar, pq_preliminar: bodyParams.q_preliminar,pn_preliminar: bodyParams.n_preliminar};
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
      console.debug(jsonBody[key].type);
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
