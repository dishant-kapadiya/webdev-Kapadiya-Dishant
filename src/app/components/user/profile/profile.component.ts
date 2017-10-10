import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    @ViewChild('f') profileForm: NgForm;

    userId: string;
    user = {};
    username: string;

    constructor(private serviceHandler: UserService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe(
                (params: any) => {
                    this.userId = params['uid'];
                }
            );
        this.user = this.serviceHandler.findUserById(this.userId);
        this.username = this.user['username'];
        console.log(this.serviceHandler.users);
    }

    updateProfile() {
        this.user['email'] = this.profileForm.value.email;
        this.user['firstName'] = this.profileForm.value.firstName;
        this.user['lastName'] = this.profileForm.value.lastName;
        this.serviceHandler.updateUser(this.userId, this.user);
    }
}
