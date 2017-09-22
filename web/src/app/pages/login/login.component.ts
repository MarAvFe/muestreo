import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login {

    form: FormGroup;
    pUser: AbstractControl;
    pPwd: AbstractControl;
    submitted: boolean = false;

    constructor(fb: FormBuilder, protected loginService: LoginService, private router: Router,
        public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.form = fb.group({
            'pUser': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'pPwd': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });

        this.pUser = this.form.controls['pUser'];
        this.pPwd = this.form.controls['pPwd'];
    }

    onSubmit(values: Object): void {
        this.submitted = true;
        this.loginService.authUser(values)
            .then(data => {
                if (data.data[0].length === 0) {
                    this.toastr.error('Los datos ingresados no coinciden con ningún usuario.');
                    console.debug('Fallo.');
                }else {
                    console.debug('Autenticado.');
                    this.gotoProfile(data.data[0][0].cedula);
                }
            });
        // if (this.form.valid) {
        //     console.debug('aqui: '+ JSON.stringify(values));
        // }
    }

    gotoProfile(pCedula: string) {
      const cedula = pCedula;
      this.router.navigate(['/pages/profile', cedula]);
    }
}
