import { Component, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { CookieService } from 'ngx-cookie';

import { UserService } from './services/user.service';

@Component({
    selector: 'my-app',
    templateUrl: '../assets/templates/app.component.html',
})

export class AppComponent {
    modalRef: BsModalRef;
    input;
    inputError: string;

    constructor(
	private modalService: BsModalService,
	private cookieService: CookieService,
	private userService: UserService
    ) {}
    
    title = 'Daily Traffic';
    
    ngOnInit(): void {
	UserService.cookie = this.cookieService;
    }

    openModal(template: TemplateRef<any>) {
	delete this.inputError;
	this.input = {};
	this.modalRef = this.modalService.show(template);
    }
    
    register(){
    	this.userService.create(this.input)
    	    .then(response => {
		alert("You registered successfully.");
		this.modalRef.hide();
    	    }, error => {
		if (error.status == 422){
		    this.inputError = error.json().message;
		}
		else {
		    alert("Error occurred.");
		}
	    });	
    }
    
    login(){
    	this.userService.getToken(this.input.email, this.input.password)
    	    .then(response => {
		UserService.cookie.put('token', response.token);
		UserService.cookie.put('fullPermission', response.full_permission);
		UserService.cookie.put('userUrl', response._links.user);
		console.log("COOKIE: ");
		console.log(UserService.cookie.getAll());
		alert("You logged in successfully.");
		this.modalRef.hide();
    	    }, error => {
		if (error.status == 422){
		    this.inputError = error.json().message;
		}
		else if (error.status == 404){
		    this.inputError = "User not found.";
		}
		else {
		    alert("Error occurred.");
		}
	    });
    }
    
    logout(){
	this.userService.clearCookie();
    }

    get currentUser(){
	return this.userService.currentUser();
    };
}
