import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Response, Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PageService {
    constructor(private _http: Http) {
    }

    baseUrl = environment.baseUrl;

    createPage(websiteId: string, page: any) {
        return this._http.post(this.baseUrl + '/api/website/' + websiteId + '/page', page)
            .map((res: Response) => {
                return res.json();
            });
    }

    findPageByWebsiteId(websiteId: string) {
        return this._http.get(this.baseUrl + '/api/website/' + websiteId + '/page')
            .map((res: Response) => {
                return res.json();
            });
    }


    findPageById(pageId: string) {
        return this._http.get(this.baseUrl + '/api/page/' + pageId)
            .map((res: Response) => {
                return res.json();
            });
    }

    updatePage(pageId: string, page: any) {
        return this._http.put(this.baseUrl + '/api/page/' + pageId, page)
            .map((res: Response) => {
                return res.json();
            });
    }

    deletePage(pageId: string) {
        return this._http.delete(this.baseUrl + '/api/page/' + pageId)
            .map((res: Response) => {
                return res.json();
            });
    }
}
