import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-widget-view-html',
    templateUrl: './widget-view-html.component.html',
    styleUrls: ['./widget-view-html.component.css']
})
export class WidgetViewHtmlComponent implements OnInit {

    @Input() widget: any;

    constructor() {
    }

    ngOnInit() {
    }

}
