import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Dashboard/home/home.component';
import { PageNotFoundComponent } from './Dashboard/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path : '', redirectTo: '/home', pathMatch: 'full'},
  {path : 'UnAuthorized', component: PageNotFoundComponent},
  {path:'**', redirectTo: '/UnAuthorized'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
