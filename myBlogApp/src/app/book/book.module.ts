import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent,
    BookItemComponent,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, FormsModule, SharedModule,
    BookRoutingModule,
    
    MatFormFieldModule,  MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  exports: [BookListComponent]
})
export class BookModule { }
