import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { User } from './models/user';
import { UserService } from './services/user.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'user-edit',
    templateUrl: '../assets/templates/user-edit.component.html'
})

export class UserEditComponent implements OnInit {

    inputError: string;
    passwordMode: boolean;

    constructor(
	private userService: UserService,
	private route: ActivatedRoute,
	private router: Router,
    ) {}
    
    ngOnInit(): void {
	this.route.paramMap
	    .switchMap((params: ParamMap) => this.setCurrentMode(params.get("mode")))
	    .subscribe(response => {});
    }
    
    setCurrentMode(mode: string): Array<any>{
	this.passwordMode = mode == "password";
	return [];
    }

    updateInfo(params: any): void {
	params["token"] = this.userService.currentToken();
    	this.userService.update(this.currentUser.id, params)
    	    .then(response => {
		delete this.inputError;
		alert("You updated your profile successfully.");
    	    }, error => {
		if (error.status == 422){
		    this.inputError = error.json().message;
		}
		else {
		    alert("Error occurred.");
		}
    	    });
    }
    
    updatePassword(params: any): void {
    	this.userService.updatePassword(params.current_password, params.new_password)
    	    .then(response => {
		delete this.inputError;
		alert("You updated your password successfully.");
    	    }, error => {
		if (error.status == 422){
		    this.inputError = error.json().message;
		}
		else {
		    alert("Error occurred.");
		}
    	    });
    }
    
    delete(): void {
	if (confirm("Are you sure to permanently delete your account?")){
    	    this.userService.delete(this.currentUser.id, this.userService.currentToken());
	}
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
