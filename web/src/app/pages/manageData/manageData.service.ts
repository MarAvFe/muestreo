import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Activity } from './objects/Activity';
import { Feedback } from './objects/Feedback';
import { Globals } from '../Globals';

@Injectable()
export class ManageDataService {

    options: any;
    heads: any;

    constructor(private http: Http, private glb: Globals) {
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

    getActivities(): Promise<Activity[]> {
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/getActivities`, '', this.options )
        .toPromise()
        .then(response => response.json().data[0] as Activity[])
        .catch(this.handleError);
    }

    addActivity(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/Activity/add`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    editActivity(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/Activity/update`, body, this.options )
        .toPromise()
        .then(response => response.json());
    }

    deleteActivity(data): Promise<Feedback> {
        const body = this.glb.toQueryString(data);
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/Activity/delete`, body, this.options )
        .toPromise()
        .then(response => response.json());
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
