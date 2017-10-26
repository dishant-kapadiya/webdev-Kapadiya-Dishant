import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @ViewChild('f') registerForm: NgForm;
    msgFlag: boolean;
    message = '';

    constructor(private serviceHandler: UserService, private router: Router) {
    }

    ngOnInit() {
    }

    register() {
        const user = {};
        user['username'] = this.registerForm.value.username;
        user['password'] = this.registerForm.value.password;
        this.serviceHandler.createUser(user)
            .subscribe(
                (data: any) => {
                    this.router.navigate(['user', data['_id']]);
                },
                (error: any) => {
                    this.msgFlag = true;
                    this.message = 'Error while creating user';
                }
            );
    }
}
