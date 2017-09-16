import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Activity } from './objects/Activity';
import { Feedback } from './objects/Feedback';

@Injectable()
export class EditService {

    heads: any;
    requestOptionsArgs: any;

    constructor(private http: Http) {
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

    getActivities(): Promise<Activity[]> {
        return this.http.post('http://localhost:2828/getActivities', { headers : this.heads } )
        .toPromise()
        .then(response => response.json().data[0] as Activity[])
        .catch(this.handleError);
    }

    addActivity(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/Activity/add', body, { headers : this.heads } )
        .toPromise()
        .then(response => response.json());
    }

    editActivity(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/Activity/update', body, { headers : this.heads } )
        .toPromise()
        .then(response => response.json());
    }

    deleteActivity(data): Promise<Feedback> {
        const body = this.toQueryString(data);
        return this.http.post('http://localhost:2828/Activity/delete', body, { headers : this.heads } )
        .toPromise()
        .then(response => response.json());
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
