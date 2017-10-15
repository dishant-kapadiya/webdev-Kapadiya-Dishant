import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-widget-view-heading',
    templateUrl: './widget-view-heading.component.html',
    styleUrls: ['./widget-view-heading.component.css']
})
export class WidgetViewHeadingComponent implements OnInit {

    @Input() widget: any;

    constructor() {
    }

    ngOnInit() {
    }

}
