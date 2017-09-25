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
                console.debug('Autenticado.');
                localStorage.setItem('cedula', data.data);
                this.router.navigate(['/pages/profile']);
            })
            .catch(err => {
                if (err.status === 401) {
                    this.toastr.error('Los datos ingresados no coinciden con ningún usuario o son incorrectos.');
                    console.debug('Fallo.');
                }
            });
        // if (this.form.valid) {
        //     console.debug('aqui: '+ JSON.stringify(values));
        // }
    }
}
