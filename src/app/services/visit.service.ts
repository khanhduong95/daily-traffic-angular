import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/toPromise';

import { Visit } from '../models/visit';

@Injectable()
export class VisitService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    
    getList(page: number): Promise<any> {
	return this.http.get(AppConfig.API_VISIT + "?page=" + page)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getListByUserPlace(userId: number, placeId: number, page: number, token: string): Promise<any> {
	return this.http.get(AppConfig.API_USER + "/" + userId + "/places/" + placeId + "/visits?page=" + page + "&token=" + token)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getDetail(id: number): Promise<Visit> {
    	const url = AppConfig.API_VISIT + "/" + id;
    	return this.http.get(url)
    	    .toPromise()
    	    .then(response => response.json() as Visit)
    	    .catch(this.handleError);
    }

    // create(name: string): Promise<Hero> {
    // 	return this.http
    // 	    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    // 	    .toPromise()
    // 	    .then(res => res.json().data as Hero)
    // 	    .catch(this.handleError);
    // }

    // update(hero: Hero): Promise<Hero> {
    // 	const url = `${this.heroesUrl}/${hero.id}`;
    // 	return this.http
    // 	    .put(url, JSON.stringify(hero), {headers: this.headers})
    // 	    .toPromise()
    // 	    .then(() => hero)
    // 	    .catch(this.handleError);
    // }

    delete(id: number, token: string): void {
    	const url = AppConfig.API_VISIT + "/" + id;
    	this.http.delete(url, {headers: this.headers, params: {token: token}})
	    .subscribe(response => response);
    }

    private handleError(error: any): Promise<any> {
	console.log("VisitService ERROR: "+error); // for demo purposes only
	return Promise.reject(error);
    }
}
