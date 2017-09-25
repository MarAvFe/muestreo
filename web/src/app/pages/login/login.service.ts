import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Feedback } from './objects/Feedback';

@Injectable()
export class LoginService {

    heads: any;

    constructor(private http: Http) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    authUser(data): Promise<any> {
        const body = this.toQueryString(data);
        const jsonHeads = new Headers();
        jsonHeads.append('Content-Type', 'application/x-www-form-urlencoded');
        jsonHeads.append('Access-Control-Allow-Origin', '*');
        jsonHeads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
        return this.http.post('http://localhost:2828/auth/login', body, { headers : jsonHeads } )
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
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
