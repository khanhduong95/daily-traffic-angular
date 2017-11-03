import { Component, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { CookieService } from 'ngx-cookie';

import { UserService } from './services/user.service';

@Component({
    selector: 'my-app',
    styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
    templateUrl: '../assets/templates/app.component.html',
})

export class AppComponent {
    public modalRef: BsModalRef;
    public input = {};
    public inputError: string;
    public currentUser;
    public loggedIn: boolean;

    constructor(
	private modalService: BsModalService,
	private cookieService: CookieService,
	private userService: UserService
    ) {}
    
    title = 'Daily Traffic';
    
    ngOnInit(): void {
	this.checkCurrentUser();
    }

    public openModal(template: TemplateRef<any>) {
	delete this.inputError;
	this.input = {};
	this.modalRef = this.modalService.show(template);
    }
    
    public register(){
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
    
    public login(){
    	this.userService.getToken(this.input["email"], this.input["password"])
    	    .then(response => {
		this.cookieService.put('token', response.token);
		this.cookieService.put('fullPermission', response.full_permission);
		this.cookieService.put('userUrl', response._links.user);
		console.log("COOKIE: ");
		console.log(this.cookieService.getAll());
		alert("You logged in successfully.");
		this.checkCurrentUser();
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

    public checkCurrentUser(){
    	this.loggedIn = false;
    	if (this.cookieService.get("token") != undefined && this.cookieService.get("userUrl") != undefined){
    	    this.userService.getDetailByUrl(this.cookieService.get("userUrl"))
    		.then(user => {
    		    this.currentUser = user;
    		    this.loggedIn = true;
    		});	    
    	}
    }
    
    public logout(){
	this.cookieService.removeAll();
    	this.loggedIn = false;
    }
}
