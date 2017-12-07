import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
    selector: 'app-widget-html',
    templateUrl: './widget-html.component.html',
    styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

    widget: any;
    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;
    widgetname: string;
    errorMsg: string;
    errorFlag: boolean;

    public editor;
    public widgettext = `<i>Insert content here...</i>`;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    onEditorCreated(quill) {
        this.editor = quill;
    }

    onContentChanged({quill, html, text}) {

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
                    this.widgetname = this.widget['name'];
                    this.widgettext = this.widget['text'];
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
