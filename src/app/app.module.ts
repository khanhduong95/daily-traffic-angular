import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { HttpModule }    from '@angular/http';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';

// import { TrafficService } from './services/traffic.service';

import { PlaceDetailComponent } from './place-detail.component';
import { PlaceComponent } from './place.component';
import { PlaceService } from './services/place.service';

import { UserDetailComponent } from './user-detail.component';
import { UserEditComponent } from './user-edit.component';
import { UserComponent } from './user.component';
import { UserService } from './services/user.service';

import { EqualValidator } from './validators/equal-validator.directive';

// import { HomeComponent } from './home.component';
// import { HomeService } from './services/home.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
	BrowserModule,
	FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
	HttpModule,
	AppRoutingModule,
	BsDropdownModule.forRoot(),
	ModalModule.forRoot(),
	CookieModule.forRoot()
    ],
    declarations: [
	AppComponent,
	// TrafficDetailComponent,
	// TrafficComponent,
	PlaceDetailComponent,
	PlaceComponent,
	UserDetailComponent,
	UserEditComponent,
	UserComponent,
	EqualValidator// ,
	// HomeComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ 
	PlaceService, 
	UserService
    ]
})
export class AppModule {}
