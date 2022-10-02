import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iBook } from '../../book.models';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  public bookForm!: FormGroup;
  public loading: boolean = false;
  public bookId: any |null = null;
  public book: iBook = {} as iBook;
  public errorMessage: string | null = null;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private bookService:BookService, private activatedRoute:ActivatedRoute) { }

  addAuthor() {
    
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      authors: [[], Validators.required],
      isbn: ['', Validators.required],
      image: ['', Validators.required],
    });
    
    this.activatedRoute.paramMap.subscribe((param) => {
      this.bookId = param.get('bookId');
    });

    if(this.bookId){
      this.loading = true;
      this.bookService.getBook(this.bookId).subscribe((data)=> {
        //this.book = data;
        this.bookForm.get("name")?.setValue(data.name);
        this.bookForm.get("authors")?.setValue(data.authors);
        this.bookForm.get("isbn")?.setValue(data.isbn);
        this.bookForm.get("image")?.setValue(data.image);

        this.loading = false;
      },(error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  submit() {
    if(this.router.url.includes('add')){
      if (!this.bookForm.valid) {
        return;
      }else{
        this.book = this.bookForm.value;
        console.log(this.bookForm.value);
        this.bookService.createBook(this.book).subscribe((data)=> {
            this.router.navigate(['book/admin']);
        }, (error) => {
          this.errorMessage = error;
          this.router.navigate(['book/add']).then();
        });
      }
    }else{
      if(this.bookId){
        if (!this.bookForm.valid) {
          return;
        }else{
          this.book = this.bookForm.value;
          console.log(this.bookForm.value);
          this.bookService.updateBook(this.book, this.bookId).subscribe((data)=> {
              this.router.navigate(['book/admin']);
          }, (error) => {
            this.errorMessage = error;
            this.router.navigate([`book/edit/${this.bookId}`]).then();
          });
        }
      }
    }
  }

  hasRoute(route: string){
    return this.router.url.includes(route);
  }

}
