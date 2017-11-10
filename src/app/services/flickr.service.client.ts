import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class FlickrService {

    key = 'f7a247b059585168ece267ff9e43eeab';
    secret = '86e384a7f7164b57';
    urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

    constructor(private _http: Http) {}

    searchPhotos(searchTerm: any) {
        const url = this.urlBase
            .replace('API_KEY', this.key)
            .replace('TEXT', searchTerm);
        console.log('URL is ' + url);
        return this._http.get(url);
    }
}