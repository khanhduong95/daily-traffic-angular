import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { CookieService } from 'ngx-cookie';

import { User } from '../models/user';

@Injectable()
export class UserService {

    private static user;
    private static permissions;

    public static cookie: CookieService;
    
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

    loggedIn(): boolean {
	return UserService.cookie.get("userUrl") != undefined
	    && UserService.cookie.get("token") != undefined;
    }

    currentUser(): User {
	if (UserService.user == undefined && this.loggedIn()){
	    this.http.get(UserService.cookie.get("userUrl"))
		.map(response => response.json())
		.subscribe(user => {
		    UserService.user = user;
		}, error => this.clearCookie());	    
	}
	return UserService.user;
    }

    currentToken(): string {
	return UserService.cookie.get("token");
    }

    currentPermissions(){
	if (UserService.permissions == undefined && this.loggedIn()){
    	    const url = UserService.cookie.get("userUrl") + "/permissions?token=" + this.currentToken();
	    this.http.get(url)
		.map(response => response.json())
		.subscribe(permissions => {
		    UserService.permissions = permissions;
		}, error => this.clearCookie());
	}
	return UserService.permissions;
    }

    clearCookie(): void {
	UserService.cookie.removeAll();
	delete UserService.user;
	delete UserService.permissions;
    }
    
    getDetail(id: number): Promise<User> {
    	const url = AppConfig.API_USER + "/" + id;
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

    update(id: number, params: any): Promise<any> {
    	const url = AppConfig.API_USER + "/" + id;
    	return this.http
    	    .put(url, JSON.stringify(params), {headers: this.headers})
    	    .toPromise()
    	    .then(response => {
		delete UserService.user;
		delete UserService.permissions;
		return response;
	    })
    	    .catch(this.handleError);
    }

    updatePassword(currentPassword: string, newPassword: string): Promise<any> {
    	const url = AppConfig.API_BASE + "password";
    	return this.http
    	    .put(url, JSON.stringify({current_password: currentPassword, new_password: newPassword, token: this.currentToken()}), {headers: this.headers})
    	    .toPromise()
    	    .then(response => response)
    	    .catch(this.handleError);
    }

    delete(id: number, token: string): void {
    	const url = AppConfig.API_USER + "/" + id;
    	this.http.delete(url, {headers: this.headers, params: {token: token}})
	    .subscribe(user => this.clearCookie(),
		       error => this.clearCookie());
    }

    private handleError(error: any): Promise<any> {
	console.log("UserService ERROR: ");
	console.log(error); // for demo purposes only
	return Promise.reject(error);
    }
}
