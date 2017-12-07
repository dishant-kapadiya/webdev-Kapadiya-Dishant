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
    userId: string;
    websiteId: string;
    website: any;
    websites = [];
    websitename: string;
    websitedesc: string;
    errorMsg: string;
    errorFlag: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WebsiteService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
        });
        this.serviceHandler.findWebsitesByUser(this.userId)
            .subscribe(
                (data: any) => {
                    this.websites = data;
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
        this.serviceHandler.findWebsiteById(this.websiteId)
            .subscribe(
                (data: any) => {
                    this.website = data;
                    this.websitename = data['name'];
                    this.websitedesc = data['description'];
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

    updateWebsite() {
        // const website = this.serviceHandler.findWebsiteById(this.websiteId);
        this.website.name = this.websitename;
        this.website.description = this.websitedesc;
        if (this.website.name !== '') {
            this.serviceHandler.updateWebsite(this.websiteId, this.website)
                .subscribe(
                    (data: any) => {
                        this.router.navigate(['/user', this.userId, 'website']);
                    },
                    (error: any) => {
                        // TODO: handle errors
                    }
                );
        } else {
            this.errorFlag = true;
            this.errorMsg = 'Website name required';
        }
    }

    deleteWebsite() {
        this.serviceHandler.deleteWebsite(this.websiteId).subscribe(
            (data: any) => {
                this.router.navigate(['/user', this.userId, 'website']);
            },
            (error: any) => {
                // TODO: handle errors
            }
        );
    }
}
