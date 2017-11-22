import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Place } from './models/place';
import { PlaceService } from './services/place.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'place-detail',
    templateUrl: '../assets/templates/place-detail.component.html'
})

export class PlaceDetailComponent implements OnInit {

    constructor(
	private placeService: PlaceService,
	private route: ActivatedRoute,
	private router: Router,
	private location: Location
    ) {}

    place: Place;
    error: any;

    ngOnInit(): void {
	this.route.paramMap
	    .switchMap((params: ParamMap) => this.placeService.getDetail(+params.get('id')))
	    .subscribe(response => {
		this.place = response;
	    }, error => {
		console.log("PlaceDetail ERROR: ");
		console.log(error);
		this.error = "Place not found.";
	    });
    }
}
