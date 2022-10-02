import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {path : 'user/admin', component : UserProfileComponent},
  {path : 'user/edit/:blogId', component : UserFormComponent},
  {path : 'user/add', component : UserFormComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
