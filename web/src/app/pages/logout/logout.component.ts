import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'logout',
    template: '<p>Logging out</p>',
})
export class Logout {
    heads: any;

    constructor( private router: Router, private http: Http) {
        this.heads = new Headers();
        this.heads.append('Content-Type', 'application/x-www-form-urlencoded');
        this.heads.append('Access-Control-Allow-Origin', '*');
        this.heads.append('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');

        this.logoutUser();
        localStorage.clear();
        this.router.navigate(['/']);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    logoutUser(): Promise<any> {
        return this.http.post('http://localhost:2828/auth/logout', { headers : this.heads } )
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }
}
