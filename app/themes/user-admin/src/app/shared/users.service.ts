import { Injectable }                                                   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams }     from '@angular/http';
import { BehaviorSubject }                                              from "rxjs";

import 'rxjs';

import { User } from "./models/user.model";

@Injectable()
export class UsersService {

    private _users$: BehaviorSubject<any>;
    private _total$: BehaviorSubject<any>;
    private dataStore: {users?: any, total?: number};

    private listUrl     = "/ajax/erdiko/users/admin/list";
    private userUrl     = "/ajax/erdiko/users/admin/retrieve";
    private updateUrl   = "/ajax/erdiko/users/admin/update";
    private createUrl   = "/ajax/erdiko/users/admin/create";

    constructor(private http: Http) {
        this.dataStore = {};
        this._users$ = new BehaviorSubject(null);
        this._total$ = new BehaviorSubject(null);
    }

    get users$() {
        return this._users$.asObservable();
    }

    get total$() {
        return this._total$.asObservable();
    }

    /**
     * Get list of users based on sort, returns an observable
     *
     */
    getUsers(pagesize?: number, page?: number, sortCol?: string, sortDir?: string) {
        let url = this.listUrl;

        if(pagesize) {
            url += "?pagesize=" + pagesize;
        }

        if(page) {
            url += "&page=" + page;
        }

        if(sortCol) {
            url += "&sort=" + sortCol;
        }

        if(sortDir) {
            url += "&direction=" + sortDir;
        }

        return this.http.get(url)
                   .map(response => response.json())
                   .subscribe(data => {
                       this.dataStore.users = [];
                       this.dataStore.total = 0;
                       if(true == data.body.success) {
                           this.dataStore.users = data.body.users.users;
                           this.dataStore.total = data.body.users.total;
                       }
                       this._users$.next(this.dataStore.users);
                       this._total$.next(this.dataStore.total);
                   },
                   error => {
                       // log the error!
                       console.error("Error retrieving users!", url, error);
                       
                       this._users$.next([]);
                       this._total$.next(0);
                   });
    }

    /**
     * Get a specific user, returns a promise
     *
     */
    getUser(id: string) {
        let url = this.userUrl + '?id=' + id;
        return this.http.get(url)
                   .toPromise()
                   .then(response => response.json().body.user as User)
                   .catch(this.handleError);
    }

    /**
     *
     *
     */
    updateUser(user) {
        let body = JSON.stringify(user);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this.updateUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);
    }

    createUser(user) {
        let body = JSON.stringify(user);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = this.createUrl;
        return this.http.post(url, body, options)
                   .toPromise()
                   .then(response => response.json().body)
                   .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        return Promise.reject(error.message || error);
    }

}
