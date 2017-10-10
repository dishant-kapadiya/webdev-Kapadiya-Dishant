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

    constructor(private serviceHandler: UserService, private router: Router) {
    }

    ngOnInit() {
    }

    register() {
        let user = {};
        console.log(this.registerForm.value.username);
        user['username'] = this.registerForm.value.username;
        user['password'] = this.registerForm.value.password;
        user = this.serviceHandler.createUser(user);
        console.log(user);
        this.router.navigate(['user', user['_id']]);
    }
}
