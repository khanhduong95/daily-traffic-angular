import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { User } from './models/user';
import { UserService } from './services/user.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'user-detail',
    templateUrl: '../assets/templates/user-detail.component.html'
})

export class UserDetailComponent implements OnInit {

    constructor(
	private userService: UserService,
	private route: ActivatedRoute,
	private router: Router,
	private location: Location
    ) {}

    user: User;
    error: any;

    ngOnInit(): void {
	this.route.paramMap
	    .switchMap((params: ParamMap) => this.userService.getDetail(+params.get('id')))
	    .subscribe(response => {
		this.user = response;
	    }, error => {
		console.log("UserDetail ERROR: ");
		console.log(error);
		this.error = "User not found.";
	    });
    }

}
