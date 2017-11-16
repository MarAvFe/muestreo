import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../Globals';

@Injectable()
export class RegisterService {

    options: any;
    heads: any;

    constructor(private http: Http, private glb: Globals) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    registerUser(data): Promise<any> {
        const interfaceUser = `username=${JSON.stringify({
                pName: data.pName,
                pLastname: data.pLastname,
                pEmail: data.pEmail,
                pPhone: data.pPhone,
                pCedula: data.pCedula,
            })}&password=${data.passwords.pPwd}`;
        console.debug(`interfaceUser: ${interfaceUser}`);
        const jsonHeads = new Headers();
        jsonHeads.append('Content-Type', 'application/x-www-form-urlencoded');
        jsonHeads.append('Access-Control-Allow-Origin', '*');
        jsonHeads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
        this.options = { headers : jsonHeads, withCredentials: true };

        return this.http.post(`http://${this.glb.ip}:${this.glb.port}/auth/register`, interfaceUser, {
            headers : jsonHeads,
        })
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
}
