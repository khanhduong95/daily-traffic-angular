import { Component, OnInit } from '@angular/core';

import { User } from './models/user';
import { UserService } from './services/user.service';

import { Router }   from '@angular/router';

@Component({
    selector: 'my-user',
    templateUrl: '../assets/templates/user.component.html',
})

export class UserComponent implements OnInit {
    currentPage: number;
    lastPage: number;
    previousPage: string;
    nextPage: string;
    usersList: User[];

    constructor(
	private router: Router,
	private userService: UserService
    ) {}

    getUsersList(page: number): void {
	this.userService.getList(page).then(response => {
	    this.usersList = response.data;
	    this.currentPage = response.current_page;
	    this.lastPage = response.last_page;
	    this.previousPage = response.prev_page_url;
	    this.nextPage = response.next_page_url;
	});
    }

    ngOnInit(): void {
	this.getUsersList(1);
    }

    getDetail(id: number): void {
	this.router.navigate(['/user', id]);
    }

    // add(name: string): void {
    // 	name = name.trim();
    // 	if (!name) { return; }
    // 	this.userService.create(name)
    // 	    .then(user => {
    // 		this.user.push(user);
    // 		this.selectedUser = null;
    // 	    });
    // }

    // delete(user: User): void {
    // 	this.userService
    // 	    .delete(user.id)
    // 	    .then(() => {
    // 		this.user = this.user.filter(h => h !== user);
    // 		if (this.selectedUser === user) { this.selectedUser = null; }
    // 	    });
    // }

}
