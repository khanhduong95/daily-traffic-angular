import { Component, OnInit } from '@angular/core';

import { Place } from './models/place';
import { PlaceService } from './services/place.service';

import { UserService } from './services/user.service';

import { Router }   from '@angular/router';

@Component({
    selector: 'visited-place',
    templateUrl: '../assets/templates/place.component.html',
})

export class VisitedPlaceComponent implements OnInit {
    currentPage: number;
    lastPage: number;
    previousPage: string;
    nextPage: string;
    places: Place[];

    constructor(
	private router: Router,
	private userService: UserService,
	private placeService: PlaceService
    ) {}

    ngOnInit(): void {}

    get placesList(): Place[]{
	if (this.places == undefined){
	    if (this.currentUser){
		this.getList(this.currentPage);
	    }
	}
	return this.places;
    }
    
    getList(page: number): void {
	this.placeService.getListByUser(this.currentUser.id, page, this.userService.currentToken()).then(response => {
	    this.places = response.data;
	    this.currentPage = response.current_page;
	    this.lastPage = response.last_page;
	    this.previousPage = response.prev_page_url;
	    this.nextPage = response.next_page_url;
	}, error => {
	    this.userService.clearCookie();
	});
    }

    get loggedIn(){
	if (! this.userService.loggedIn())
	    this.router.navigate(["/"]);	
	return true;
    }
    
    get currentUser(){
	return this.userService.currentUser();
    };
}
