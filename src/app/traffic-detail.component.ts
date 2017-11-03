import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Traffic } from './models/traffic';
import { TrafficService } from './services/traffic.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'traffic-detail',
    templateUrl: '../assets/templates/traffic-detail.component.html'
})

export class TrafficDetailComponent implements OnInit {

    constructor(
	private trafficService: TrafficService,
	private route: ActivatedRoute,
	private router: Router,
	private location: Location
    ) {}

    traffic: Traffic;

    ngOnInit(): void {
	this.route.paramMap
	    .switchMap((params: ParamMap) => this.trafficService.getTrafficDetail(+params.get('id')))
	    .subscribe(traffic => {
		this.traffic = traffic;
	    });
    }

}
