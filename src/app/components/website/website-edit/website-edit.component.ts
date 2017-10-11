import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-website-edit',
    templateUrl: './website-edit.component.html',
    styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

    @ViewChild('f') editForm: NgForm;

    userId: string;
    websiteId: string;
    website: any;
    websites = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WebsiteService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
        });
        this.websites = this.serviceHandler.findWebsitesByUser(this.userId);
        this.website = this.serviceHandler.findWebsiteById(this.websiteId);
    }

    goBack() {
        history.back();
    }

    updateWebiste() {
        // const website = this.serviceHandler.findWebsiteById(this.websiteId);
        this.website.name = this.editForm.value.websitename;
        this.website.description = this.editForm.value.websitedesc;
        this.serviceHandler.updateWebsite(this.websiteId, this.website);
    }

    deleteWebsite() {
        this.serviceHandler.deleteWebsite(this.websiteId);
        this.router.navigate(['/user', this.userId, 'website']);
    }
}
