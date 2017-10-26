import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class PageService {
    constructor() {
    }

    pages = [
        {'_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem'},
        {'_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem'},
        {'_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem'}
    ];


    api = {
        'createPage': this.createPage,
        'findPageByWebsiteId': this.findPageByWebsiteId,
        'findPageById': this.findPageById,
        'updatePage': this.updatePage,
        'deletePage': this.deletePage
    };


    createPage(websiteId: string, page: any) {
        let random = Math.floor(Math.random() * 100000).toString();
        while (this.findPageById(random)) {
            random = Math.floor(Math.random() * 100000).toString();
        }
        page._id = random;
        page.websiteId = websiteId;
        this.pages.push(page);
        return page;
    }

    findPageByWebsiteId(websiteId: string) {
        const list = [];
        for (let x = 0; x < this.pages.length; x++) {
            if (this.pages[x].websiteId === websiteId) {
                list.push(this.pages[x]);
            }
        }
        return list;
    }


    findPageById(pageId: string) {
        for (let x = 0; x < this.pages.length; x++) {
            if (this.pages[x]._id === pageId) {
                return this.pages[x];
            }
        }
    }

    updatePage(pageId: string, page: any) {
        for (let x = 0; x < this.pages.length; x++) {
            if (this.pages[x]._id === pageId) {
                this.pages[x] = page;
            }
        }
    }

    deletePage(pageId: string) {
        for (let x = 0; x < this.pages.length; x++) {
            if (this.pages[x]._id === pageId) {
                this.pages.splice(x, 1);
            }
        }
    }
}
