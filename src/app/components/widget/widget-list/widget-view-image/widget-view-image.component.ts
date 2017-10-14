import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-widget-view-image',
    templateUrl: './widget-view-image.component.html',
    styleUrls: ['./widget-view-image.component.css']
})
export class WidgetViewImageComponent implements OnInit {

    @Input() widget: any;

    constructor() {
    }

    ngOnInit() {
    }

}
