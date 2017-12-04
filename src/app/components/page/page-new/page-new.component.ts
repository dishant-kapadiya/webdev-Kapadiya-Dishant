import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-page-new',
    templateUrl: './page-new.component.html',
    styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

    @ViewChild('f') pageForm: NgForm;

    userId: string;
    websiteId: string;
    pages = [];
    errorMsg: string;
    errorFlag: boolean;

    constructor(private router: Router, private serviceHandler: PageService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
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


    createPage() {
        const page = {};
        page['name'] = this.pageForm.value.pagename;
        page['description'] = this.pageForm.value.pagedesc;
        if (page['name'] !== '') {
            this.serviceHandler.createPage(this.websiteId, page)
                .subscribe(
                    (data: any) => {
                        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
                    },
                    (error: any) => {
                        // TODO: handle errors
                    }
                );
        } else {
            this.errorFlag = true;
            this.errorMsg = 'Page name required';
        }
    }

}
