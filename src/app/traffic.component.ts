import { Component, OnInit } from '@angular/core';

import { Traffic } from './models/traffic';
import { TrafficService } from './services/traffic.service';

import { Router }   from '@angular/router';

@Component({
    selector: 'my-traffic',
    templateUrl: '../assets/templates/traffic.component.html',
})

export class TrafficComponent implements OnInit {
    trafficList: Traffic[];

    constructor(
	private router: Router,
	private trafficService: TrafficService
    ) {}

    getTrafficList(): void {
	this.trafficService.getTraffic().then(traffic => this.trafficList = traffic);
    }

    ngOnInit(): void {
	this.getTrafficList();
    }

    getDetail(id: number): void {
	this.router.navigate(['/traffic', id]);
    }

    // add(name: string): void {
    // 	name = name.trim();
    // 	if (!name) { return; }
    // 	this.trafficService.create(name)
    // 	    .then(traffic => {
    // 		this.traffic.push(traffic);
    // 		this.selectedTraffic = null;
    // 	    });
    // }

    // delete(traffic: Traffic): void {
    // 	this.trafficService
    // 	    .delete(traffic.id)
    // 	    .then(() => {
    // 		this.traffic = this.traffic.filter(h => h !== traffic);
    // 		if (this.selectedTraffic === traffic) { this.selectedTraffic = null; }
    // 	    });
    // }

}
