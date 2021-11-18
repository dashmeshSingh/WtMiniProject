import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component'
import { ViewleavesComponent } from './viewleaves/viewleaves.component';
import { UpdateleaveComponent } from './updateleave/updateleave.component';
import { DeleteleaveComponent } from './deleteleave/deleteleave.component';
import { AdminviewleavesComponent } from './adminviewleaves/adminviewleaves.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'viewusers', component: BoardAdminComponent },
  { path: 'applyleaves', component: ApplyleaveComponent },
  { path: 'viewleaves', component: ViewleavesComponent },
  { path: 'updateleaves', component: UpdateleaveComponent },
  { path: 'deleteleaves', component: DeleteleaveComponent },
  { path: 'adminviewleaves', component: AdminviewleavesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
