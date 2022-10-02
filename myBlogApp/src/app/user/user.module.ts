import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, FormsModule, SharedModule,
    UserRoutingModule,
    
    MatFormFieldModule,  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ]
})
export class UserModule { }
