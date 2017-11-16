import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../Globals';




@Injectable()
export class LoginService {

    options: any;
    heads: any;

    constructor(private http: Http, private glb: Globals) {

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    authUser(data): Promise<any> {
        const body = this.glb.toQueryString(data);
        const jsonHeads = new Headers();
        jsonHeads.append('Content-Type', 'application/x-www-form-urlencoded');
        jsonHeads.append('Access-Control-Allow-Origin', '*');
        jsonHeads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
        this.options = { headers : jsonHeads, withCredentials: true };
        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/auth/login`, body, this.options )
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
}
