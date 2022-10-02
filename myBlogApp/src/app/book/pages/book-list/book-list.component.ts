import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iBook } from '../../book.models';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  
  public loading: boolean = false;
  public books: iBook[] = [];
  public errorMessage: string | null = null;

  commandBarAction(event:string){
      this.router.navigate(['book/' + event]);
  }

  deleteBook(event:any){
    if(event){
      this.bookService.deleteBook(event).subscribe((data) => {
        this.loading = true;
        this.bookService.getAllBooks().subscribe((data) => {
          this.books = data;
          window.location.reload()
          this.loading = false;
        },(error) => {
          this.errorMessage = error;
          this.loading = false;
        });
      });
    }
  }

   ngOnInit(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.loading = false;
    },(error) => {
      this.errorMessage = error;
      this.loading = false;
    });

    }

}
