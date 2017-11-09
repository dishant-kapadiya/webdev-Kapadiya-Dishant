import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
    selector: 'app-widget-header',
    templateUrl: './widget-header.component.html',
    styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;
    widgetname: string;
    widgettext: string;
    widgetsize: number;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
            this.widgetId = params['wgid'];
        });
        // this.widget.type = '';
        this.serviceHandler.findWidgetById(this.widgetId)
            .subscribe(
                (data: any) => {
                    this.widget = data;
                    this.widgetname = this.widget['name'];
                    this.widgettext = this.widget['text'];
                    this.widgetsize = this.widget['size'];
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

    updateWidget() {
        // const website = this.serviceHandler.findWebsiteById(this.websiteId);
        this.widget.name = this.widgetname;
        this.widget.text = this.widgettext;
        this.widget.size = this.widgetsize;
        this.serviceHandler.updateWidget(this.widgetId, this.widget)
            .subscribe(
                (data: any) => {
                    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

    deleteWidget() {
        this.serviceHandler.deleteWidget(this.widgetId)
            .subscribe(
                (data: any) => {
                    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }
}
