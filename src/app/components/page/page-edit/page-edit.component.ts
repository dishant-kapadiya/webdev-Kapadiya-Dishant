import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from "../../../services/page.service.client";

@Component({
    selector: 'app-page-edit',
    templateUrl: './page-edit.component.html',
    styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    page: any;
    pages = [];
    pagename: string;
    pagedesc: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: PageService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
        });
        this.pages = this.serviceHandler.findPageByWebsiteId(this.websiteId);
        this.page = this.serviceHandler.findPageById(this.pageId);
        this.pagename = this.page['name'];
        this.pagedesc = this.page['description'];
    }


    updatePage() {
        this.page.name = this.pagename;
        this.page.description = this.pagedesc;
        this.serviceHandler.updatePage(this.pageId, this.page);
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
    }

    deletePage() {
        this.serviceHandler.deletePage(this.pageId);
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
    }

}
