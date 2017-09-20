import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { PreParam } from './objects/PreParam';
import { Feedback } from './objects/Feedback';

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

  getPreParam(data): Promise<PreParam[]> {
    const body = this.toQueryString(data);
    return this.http.post('http://localhost:2828/getPreParam', body, { headers : this.heads } )
    .toPromise()
    .then(response => response.json().data[0] as PreParam[])
    .catch(this.handleError);
  }

  editPreParam(data): Promise<Feedback> {
    const body = this.toQueryString(data);
    return this.http.post('http://localhost:2828/pUpPreParamsSampling', body, { headers : this.heads } )
    .toPromise()
    .then(response => response.json());
  }

  createCompose(Info, bodyParams ): Object {
    console.log(Info);
    console.log(bodyParams);
   return {pId_Sampling:Info.pId_Sampling, pDescription: Info.pDescription, pIdSamplingType:Info.pIdSamplingType,
     pp_preliminar:bodyParams.p_preliminar,pq_preliminar:bodyParams.q_preliminar, perror_preliminar:bodyParams.error_preliminar,
     pn_preliminar: bodyParams.n_preliminar, pz_preliminar:bodyParams.z_preliminar}
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
      console.debug(jsonBody[key].type)
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
