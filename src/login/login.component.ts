import { Component, OnInit, ViewChild }         from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { AuthService }   from '../auth.service';

import { tpl } from './login.component.tpl';

@Component({
  selector: 'app-login',
  template: tpl
})
export class LoginComponent implements OnInit {

    public wait: any;

    public title: string;

    public loginForm: FormGroup;

    public loggedOut: string;
    public error: string;

    constructor(
           private authService: AuthService,
           private router: Router,
           private fb: FormBuilder) { 

        // init the wait state (and indication animation) to 'off'
        this.wait = false;
        
    }

    ngOnInit() {

        this._initForm();

    }

    private _initForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password:  ['', Validators.required]
        });
    }

    onSubmit({ value, valid }: { value: any, valid: boolean }) {

        this.wait = true;

        if(valid) {

            this.authService.login(value)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/']);
                        //this.messageService.sendMessage("login", "success");
                    } else {
                        //this.messageService.sendMessage("login", "error");
                        this.wait = false;
                    }
                }, err => {
                    //this.messageService.sendMessage("login", "no-password");
                    this.wait = false;
                });

        }
    }

}
