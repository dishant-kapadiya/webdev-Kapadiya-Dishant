import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-widget-view-text',
    templateUrl: './widget-view-text.component.html',
    styleUrls: ['./widget-view-text.component.css']
})
export class WidgetViewTextComponent implements OnInit {

    @Input() widget: any;

    constructor() {
    }

    ngOnInit() {
    }

}
