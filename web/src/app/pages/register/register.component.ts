import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss']
})
export class Register {

    public form:FormGroup;
    public name:AbstractControl;
    public lastname:AbstractControl;
    public email:AbstractControl;
    public password:AbstractControl;
    public repeatPassword:AbstractControl;
    public passwords:FormGroup;
    public identification:AbstractControl;
    public phone:AbstractControl;

    public submitted:boolean = false;

    constructor(fb:FormBuilder) {

        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'lastname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') }),
            'identification': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'phone': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });

        this.name = this.form.controls['name'];
        this.lastname = this.form.controls['lastname'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        this.identification = this.form.controls['identification'];
        this.phone = this.form.controls['phone'];
    }

    public onSubmit(values:Object):void {
        this.submitted = true;
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
        }
    }
}
