import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/toPromise';

import { Traffic } from '../models/traffic';

@Injectable()
export class TrafficService {
    
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    
    getTraffic(): Promise<Traffic[]> {
	return this.http.get(AppConfig.API_TRAFFIC)
            .toPromise()
            .then(response => response.json().data as Traffic[])
            .catch(this.handleError);
    }
    
    getTrafficDetail(id: number): Promise<Traffic> {
	const url = AppConfig.API_TRAFFIC + "/" + id;
	return this.http.get(url)
	    .toPromise()
	    .then(response => response.json() as Traffic)
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
	alert(error); // for demo purposes only
	return Promise.reject(error.message || error);
    }
}
