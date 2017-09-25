import { Injectable } from '@angular/core';

@Injectable()
export class IsLoggedInGuardService {

    heads: any;

    constructor() {
    }

    isLoggedIn() {
        console.debug('Checking if logged in access...');
        return localStorage.getItem('cedula') !== null;
    }
}
