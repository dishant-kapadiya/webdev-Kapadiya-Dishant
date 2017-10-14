import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-website-new',
    templateUrl: './website-new.component.html',
    styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

    @ViewChild('f') websiteForm: NgForm;

    userId: string;
    websites = [];

    constructor(private router: Router, private serviceHandler: WebsiteService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
        });
        this.websites = this.serviceHandler.findWebsitesByUser(this.userId);
    }

    createWebsite() {
        const website = {};
        website['name'] = this.websiteForm.value.websitename;
        website['description'] = this.websiteForm.value.websitedesc;
        this.serviceHandler.createWebsite(this.userId, website);
        this.router.navigate(['/user', this.userId, 'website']);
    }
}
