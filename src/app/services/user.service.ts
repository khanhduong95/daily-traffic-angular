import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class UserService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    
    getList(page: number): Promise<any> {
	return this.http.get(AppConfig.API_USER + "?page=" + page)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getToken(email: string, password: string): Promise<any> {
    	const url = AppConfig.API_BASE + "token?email=" + email + "&password=" + password;
	return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getDetail(id: number): Promise<User> {
    	const url = AppConfig.API_USER + "/" + id;
    	return this.getDetailByUrl(url);
    }

    getDetailByUrl(url: string): Promise<User> {
    	return this.http.get(url)
    	    .toPromise()
    	    .then(response => response.json() as User)
    	    .catch(this.handleError);
    }

    create(params: any): Promise<any> {
    	return this.http
    	    .post(AppConfig.API_USER, JSON.stringify(params), {headers: this.headers})
    	    .toPromise()
    	    .then(response => response)
    	    .catch(this.handleError);
    }

    update(user: User): Promise<any> {
    	const url = AppConfig.API_USER + "/" + user.id;
    	return this.http
    	    .put(url, JSON.stringify(user), {headers: this.headers})
    	    .toPromise()
    	    .then(response => response)
    	    .catch(this.handleError);
    }

    delete(id: number): Promise<any> {
    	const url = AppConfig.API_USER + "/" + id;
    	return this.http.delete(url, {headers: this.headers})
    	    .toPromise()
    	    .then(response => response)
    	    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
	console.log("UserService ERROR: ");
	console.log(error); // for demo purposes only
	return Promise.reject(error);
    }
}
