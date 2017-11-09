import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {
    constructor(private _http: Http) {
    }

    baseUrl = environment.baseUrl;

    createWebsiteForUser(userId: string, website: any) {
        return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', website)
            .map((res: Response) => {
                return res.json();
            });
    }

    findWebsitesByUser(userId: string) {
        return this._http.get(this.baseUrl + '/api/user/' + userId + '/website')
            .map((res: Response) => {
                return res.json();
            });
    }

    findWebsiteById(websiteId: string) {
        return this._http.get(this.baseUrl + '/api/website/' + websiteId)
            .map((res: Response) => {
                return res.json();
            });
    }

    updateWebsite(websiteId: string, website: any) {
        return this._http.put(this.baseUrl + '/api/website/' + websiteId, website)
            .map((res: Response) => {
                return res.json();
            });
    }

    deleteWebsite(websiteId: string) {
        return this._http.delete(this.baseUrl + '/api/website/' + websiteId)
            .map((res: Response) => {
                return res.json();
            });
    }
}
