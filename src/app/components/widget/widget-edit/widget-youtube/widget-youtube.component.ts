import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
    selector: 'app-widget-youtube',
    templateUrl: './widget-youtube.component.html',
    styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;
    widgeturl: string;
    widgetname: string;
    widgettext: string;
    widgetwidth: number;
    errorMsg: string;
    errorFlag: boolean;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
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
                    if (this.widget.hasOwnProperty('name')) {
                        this.widgetname = this.widget['name'];
                    }
                    if (this.widget.hasOwnProperty('text')) {
                        this.widgettext = this.widget['text'];
                    }
                    if (this.widget.hasOwnProperty('url')) {
                        this.widgeturl = this.widget['url'];
                    }
                    if (this.widget.hasOwnProperty('width')) {
                        this.widgetwidth = Number(this.widget['width'].slice(0, -1));
                    }
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

    updateWidget() {
        this.widget.name = this.widgetname;
        this.widget.text = this.widgettext;
        this.widget.width = this.widgetwidth + '%';
        this.widget.url = this.widgeturl;
        if (this.widget.name) {
            this.serviceHandler.updateWidget(this.widgetId, this.widget)
                .subscribe(
                    (data: any) => {
                        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
                    },
                    (error: any) => {
                        // TODO: handle errors
                    }
                );
        } else {
            this.errorFlag = true;
            this.errorMsg = 'Widget name required';
        }
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
