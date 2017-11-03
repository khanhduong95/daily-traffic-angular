import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent }   from './dashboard.component';
// import { HomeComponent }      from './home.component';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { PlaceComponent } from './place.component';
import { PlaceDetailComponent } from './place-detail.component';

const routes: Routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'dashboard',  component: DashboardComponent },
    // { path: '',     component: HomeComponent },
    { path: 'user/:id', component: UserDetailComponent },
    { path: 'users',     component: UserComponent },
    { path: 'place/:id', component: PlaceDetailComponent },
    { path: 'places',     component: PlaceComponent }
];

@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}