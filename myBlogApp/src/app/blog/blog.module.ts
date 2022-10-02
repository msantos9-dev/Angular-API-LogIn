import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { BlogFormComponent } from './pages/blog-form/blog-form.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogItemComponent,
    BlogFormComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, FormsModule, SharedModule,
    BlogRoutingModule,
    
    MatFormFieldModule,  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  exports: [BlogListComponent]
})
export class BlogModule { }
