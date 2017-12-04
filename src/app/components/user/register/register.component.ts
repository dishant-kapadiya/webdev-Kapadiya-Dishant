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
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;
        if (this.registerForm.value.vpassword === password) {
            this.serviceHandler.register(username, password)
                .subscribe(
                    (data: any) => {
                        this.router.navigate(['/profile']);
                    },
                    (error: any) => {
                        this.msgFlag = true;
                        this.message = 'Error while creating user';
                    }
                );
        } else {
            this.msgFlag = true;
            this.message = 'Passwords do not match!';
        }
    }
}
