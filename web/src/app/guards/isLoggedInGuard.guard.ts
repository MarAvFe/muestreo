import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { IsLoggedInGuardService } from './isLoggedInGuard.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(private service: IsLoggedInGuardService, private router: Router) {}

    canActivate() {
        if (this.service.isLoggedIn()) {
            console.debug('Activation allowed.');
            return true;
        }else {
            console.debug('Activation rejected.');
            this.router.navigate(['/logout']);
            return false;
        }
    }
}
