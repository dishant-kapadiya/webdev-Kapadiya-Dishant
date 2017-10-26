import {Component, OnInit} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-website-list',
    templateUrl: './website-list.component.html',
    styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

    userId: string;
    websites = [];

    constructor(private serviceHandler: WebsiteService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
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
    }
}
