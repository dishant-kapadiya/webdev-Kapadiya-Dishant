import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-widget-view-youtube',
    templateUrl: './widget-view-youtube.component.html',
    styleUrls: ['./widget-view-youtube.component.css']
})
export class WidgetViewYoutubeComponent implements OnInit {

    @Input() widget: any;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.widget['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.widget['url']);
    }
}
