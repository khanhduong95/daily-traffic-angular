import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/toPromise';

import { Place } from '../models/place';

@Injectable()
export class PlaceService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    
    getList(page: number): Promise<any> {
	return this.http.get(AppConfig.API_PLACE + "?page=" + page)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getListByUser(userId: number, page: number, token: string): Promise<any> {
	return this.http.get(AppConfig.API_USER + "/" + userId + "/places?page=" + page + "&token=" + token)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    
    getDetail(id: number): Promise<Place> {
    	const url = AppConfig.API_PLACE + "/" + id;
    	return this.http.get(url)
    	    .toPromise()
    	    .then(response => response.json() as Place)
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

    // delete(id: number): Promise<void> {
    // 	const url = `${this.heroesUrl}/${id}`;
    // 	return this.http.delete(url, {headers: this.headers})
    // 	    .toPromise()
    // 	    .then(() => null)
    // 	    .catch(this.handleError);
    // }

    private handleError(error: any): Promise<any> {
	console.log("PlaceService ERROR: "+error); // for demo purposes only
	return Promise.reject(error);
    }
}
