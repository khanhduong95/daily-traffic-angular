import { Component, OnInit } from '@angular/core';

import { Place } from './models/place';
import { PlaceService } from './services/place.service';

import { Router }   from '@angular/router';

@Component({
    selector: 'my-place',
    templateUrl: '../assets/templates/place.component.html',
})

export class PlaceComponent implements OnInit {
    currentPage: number;
    lastPage: number;
    previousPage: string;
    nextPage: string;
    placesList: Place[];

    constructor(
	private router: Router,
	private placeService: PlaceService
    ) {}

    getList(page: number): void {
	this.placeService.getList(page).then(response => {
	    this.placesList = response.data;
	    this.currentPage = response.current_page;
	    this.lastPage = response.last_page;
	    this.previousPage = response.prev_page_url;
	    this.nextPage = response.next_page_url;
	});
    }

    ngOnInit(): void {
	this.getList(1);
    }

    getDetail(id: number): void {
	this.router.navigate(['/place', id]);
    }

    // add(name: string): void {
    // 	name = name.trim();
    // 	if (!name) { return; }
    // 	this.placeService.create(name)
    // 	    .then(place => {
    // 		this.place.push(place);
    // 		this.selectedPlace = null;
    // 	    });
    // }

    // delete(place: Place): void {
    // 	this.placeService
    // 	    .delete(place.id)
    // 	    .then(() => {
    // 		this.place = this.place.filter(h => h !== place);
    // 		if (this.selectedPlace === place) { this.selectedPlace = null; }
    // 	    });
    // }

}
