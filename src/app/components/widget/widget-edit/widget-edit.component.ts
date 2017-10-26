import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
    selector: 'app-widget-edit',
    templateUrl: './widget-edit.component.html',
    styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;

    constructor(private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
            this.widgetId = params['wgid'];
        });
        this.serviceHandler.findWidgetById(this.widgetId)
            .subscribe(
                (data: any) => {
                    this.widget = data;
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

}
