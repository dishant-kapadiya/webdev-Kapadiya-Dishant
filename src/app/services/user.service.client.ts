import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private _http: Http) {
    }

    baseUrl = environment.baseUrl;

    createUser(user: any) {
        return this._http.post(this.baseUrl + '/api/user', user)
            .map((res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }


    findUserById(userId: string) {
        return this._http.get(this.baseUrl + '/api/user/' + userId)
            .map((res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findUserByUsername(username: string) {
        return this._http.get(this.baseUrl + '/api/user?username=' + username)
            .map((res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    findUserByCredentials(username: string, password: string) {
        return this._http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password)
            .map((res: Response) => {
                    const data = res.json();
                    return data;
                }
            );
    }

    updateUser(userId: string, user: any) {
        return this._http.put(this.baseUrl + '/api/user/' + userId, user)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }

    deleteUser(userId: string) {
        return this._http.delete(this.baseUrl + '/api/user/' + userId)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }
}
