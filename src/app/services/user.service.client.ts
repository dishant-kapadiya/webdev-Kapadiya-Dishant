import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Injectable()
export class UserService {
    constructor(private _http: Http, private router: Router, private sharedService: SharedService) {
    }

    baseUrl = environment.baseUrl;

    options = new RequestOptions();

    loggedIn() {
        this.options.withCredentials = true;
        return this._http.post(this.baseUrl + '/api/loggedin', '', this.options)
            .map((res: Response) => {
                const user = res.json();
                if (user !== 0) {
                    this.sharedService.user = user; // setting user so as to share with all components
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            });
    }

    createUser(user: any) {
        return this._http.post(this.baseUrl + '/api/user', user, this.options)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }

    register(user: any) {
        this.options.withCredentials = true;

        return this._http.post(this.baseUrl + '/api/register', user, this.options)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
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
        this.options.withCredentials = true;
        const body = {
            username: username,
            password: password
        };
        return this._http.post(this.baseUrl + '/api/login', body, this.options)
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

    logout() {
        this.options.withCredentials = true;
        return this._http.post(this.baseUrl + '/api/logout', '', this.options)
            .map(
                (res: Response) => {
                    const data = res;
                }
            );
    }
}
