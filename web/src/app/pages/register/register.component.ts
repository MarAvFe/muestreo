import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../theme/validators';
import { RegisterService } from './register.service';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss'],
})
export class Register {

    form: FormGroup;
    pName: AbstractControl;
    pLastname: AbstractControl;
    pEmail: AbstractControl;
    passwords: FormGroup;
    pPwd: AbstractControl;
    repeatPassword: AbstractControl;
    pCedula: AbstractControl;
    pPhone: AbstractControl;

    submitted: boolean = false;

    constructor(fb: FormBuilder, protected registerService: RegisterService, private router: Router,
        public toastr: ToastsManager, vcr: ViewContainerRef) {
            this.toastr.setRootViewContainerRef(vcr);
            this.form = fb.group({
                'pName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'pLastname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'pEmail': ['', Validators.compose([Validators.required, EmailValidator.validate])],
                'passwords': fb.group({
                    'pPwd': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                    'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
                }, { validator: EqualPasswordsValidator.validate('pPwd', 'repeatPassword') }),
                'pCedula': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'pPhone': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            });

            this.pName = this.form.controls['pName'];
            this.pLastname = this.form.controls['pLastname'];
            this.pEmail = this.form.controls['pEmail'];
            this.passwords = <FormGroup> this.form.controls['passwords'];
            this.pPwd = this.passwords.controls['pPwd'];
            this.repeatPassword = this.passwords.controls['repeatPassword'];
            this.pCedula = this.form.controls['pCedula'];
            this.pPhone = this.form.controls['pPhone'];
        }

        onSubmit(values: Object): void {
            this.submitted = true;
            console.debug('Values: ' + JSON.stringify(values));
            if (this.form.valid) {
                this.registerService.registerUser(values)
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
            }
        }
    }
