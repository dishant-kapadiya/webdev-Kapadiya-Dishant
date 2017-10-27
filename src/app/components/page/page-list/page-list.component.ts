import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
    selector: 'app-page-list',
    templateUrl: './page-list.component.html',
    styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
    userId: string;
    websiteId: string;
    pages = [];

    constructor(private router: Router, private activatedRoutes: ActivatedRoute, private serviceHandler: PageService) {
    }

    ngOnInit() {
        this.activatedRoutes.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
        });
        this.serviceHandler.findPageByWebsiteId(this.websiteId)
            .subscribe(
                (data: any) => {
                    this.pages = data;
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }
}
