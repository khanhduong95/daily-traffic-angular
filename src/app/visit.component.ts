import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { UserService } from './services/user.service';

import { Visit } from './models/visit';
import { VisitService } from './services/visit.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'visit',
    templateUrl: '../assets/templates/visit.component.html'
})

export class VisitComponent implements OnInit {

    currentPage: number = 1;
    lastPage: number;
    previousPage: string;
    nextPage: string;
    visits: Visit[];
    placeId: number;
    
    constructor(
	private route: ActivatedRoute,
	private userService: UserService,
	private visitService: VisitService
    ) {}

    ngOnInit(): void {
	this.route.paramMap
	    .switchMap((params: ParamMap) => this.setCurrentPlace(+params.get('id')))
	    .subscribe(response => {});
    }
    
    setCurrentPlace(id: number): Array<any>{
	this.placeId = id;
	return [];
    }

    get visitsList(): Visit[]{
	if (this.visits == undefined){
	    if (this.currentUser){
		this.getList(this.currentPage);
	    }
	}
	return this.visits;
    }
    
    getList(page: number): void {
	this.visitService.getListByUserPlace(this.currentUser.id, this.placeId, page, this.userService.currentToken()).then(response => {
	    this.visits = response.data;
	    this.currentPage = response.current_page;
	    this.lastPage = response.last_page;
	    this.previousPage = response.prev_page_url;
	    this.nextPage = response.next_page_url;
	}, error => {
	    if (error.status == 422)
		this.userService.clearCookie();
	});
    }
    
    delete(id: number): void {
	if (confirm("Are you sure to permanently delete this visit?")){
    	    this.visitService.delete(id, this.userService.currentToken());
	}
    }

    get loggedIn(){
	return this.userService.loggedIn();
    }
    
    get currentUser(){
	return this.userService.currentUser();
    };
}
