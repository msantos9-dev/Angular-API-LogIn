import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { iBook } from '../book.models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private serverUrl: string = 'http://localhost:9000'; //json server url for server

  constructor(private httpClient:HttpClient) { }

  //getting all books
  public getAllBooks():Observable<iBook[]>{
    let dataUrl: string = `${this.serverUrl}/books`;
    return this.httpClient.get<iBook[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get single book
  public getBook(bookId: number):Observable<iBook>{
    let dataUrl: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.get<iBook>(dataUrl).pipe(catchError(this.handleError));
  }

  //create book
  public createBook(book: iBook):Observable<iBook>{
    let dataUrl: string = `${this.serverUrl}/books`;
    return this.httpClient.post<iBook>(dataUrl, book).pipe(catchError(this.handleError));
  }

  //update book
  public updateBook(book: iBook, bookId: number ):Observable<iBook>{
    let dataUrl: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.put<iBook>(dataUrl, book).pipe(catchError(this.handleError));
  }

   //delete book
   public deleteBook(bookId: number ):Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/books/${bookId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError));
  }


  //error handling
  public handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
        errorMessage = `Error: ${error.error.message}`
    }else{
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`; 
    }
    return throwError(errorMessage);
  }
}
