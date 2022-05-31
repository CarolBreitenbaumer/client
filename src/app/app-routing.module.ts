import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { SubjectDetailComponent } from
    './subject-detail/subject-detail.component';
import { HomeComponent } from './home/home.component';
import {SubjectListComponent} from "./subject-list/subject-list.component";
import {SubjectFormComponent} from "./subject-form/subject-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'subjects', component: SubjectListComponent},
  { path: 'subjects/:name', component: SubjectDetailComponent },
  { path: 'admin', component: SubjectFormComponent, canActivate:[CanNavigateToAdminGuard]},
  { path: 'admin/:id', component: SubjectFormComponent, canActivate:[CanNavigateToAdminGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
