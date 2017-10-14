import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
    selector: 'app-widget-image',
    templateUrl: './widget-image.component.html',
    styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widget: any;
    widgeturl: string;
    widgetname: string;
    widgettext: string;
    widgetwidth: number;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
            this.widgetId = params['wgid'];
        });
        this.widget = this.serviceHandler.findWidgetById(this.widgetId);
        this.widgetname = this.widget['name'];
        this.widgettext = this.widget['text'];
        this.widgeturl = this.widget['url'];
        this.widgetwidth = Number(this.widget['width'].slice(0, -1));
    }

    updateWidget() {
        this.widget.name = this.widgetname;
        this.widget.text = this.widgettext;
        this.widget.width = this.widgetwidth + '%';
        this.widget.url = this.widgeturl;
        this.serviceHandler.updateWidget(this.widgetId, this.widget);
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }

    deleteWidget() {
        this.serviceHandler.deleteWidget(this.widgetId);
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }
}
