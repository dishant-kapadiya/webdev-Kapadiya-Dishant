import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
    selector: 'app-widget-list',
    templateUrl: './widget-list.component.html',
    styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    widgets = [];

    constructor(private router: Router, private activatedRouter: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
        });
        this.serviceHandler.findWidgetsByPageId(this.pageId)
            .subscribe(
                (data: any) => {
                    this.widgets = data;
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }
}
