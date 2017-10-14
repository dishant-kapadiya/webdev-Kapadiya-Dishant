import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('f') loginForm: NgForm;

    username: string;
    password: string;
    errorFlag: boolean;
    errorMsg = 'Invalid username or password';

    constructor(private router: Router, private serviceHandler: UserService) {
    }

    ngOnInit() {
    }

    login() {
        this.username = this.loginForm.value.username;
        this.password = this.loginForm.value.password;
        const user = this.serviceHandler.findUserByCredentials(this.username, this.password);
        if (user) {
            this.errorFlag = false;
            this.router.navigate(['user', user._id]);
        } else {
            this.errorFlag = true;
        }
    }
}
