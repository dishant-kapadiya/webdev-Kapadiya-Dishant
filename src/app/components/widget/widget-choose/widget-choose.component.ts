import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
    selector: 'app-widget-choose',
    templateUrl: './widget-choose.component.html',
    styleUrls: ['./widget-choose.component.css']
})
export class WidgetChooseComponent implements OnInit {

    userId: string;
    websiteId: string;
    pageId: string;
    widgetId: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private serviceHandler: WidgetService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.userId = params['uid'];
            this.websiteId = params['wid'];
            this.pageId = params['pid'];
            this.widgetId = params['wgid'];
        });
    }

    createWidget(type: string) {
        this.serviceHandler.createWidget(this.pageId, {'widgetType': type})
            .subscribe(
                (data: any) => {
                    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget', data['_id']]);
                },
                (error: any) => {
                    // TODO: handle errors
                }
            );
    }

}
