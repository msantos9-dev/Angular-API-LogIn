import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { iBlog } from '../blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private serverUrl: string = 'http://localhost:9000'; //json server url for server

  constructor(private httpClient:HttpClient) { }

  //getting all blog
  public getAllBlogs():Observable<iBlog[]>{
    let dataUrl: string = `${this.serverUrl}/blogs`;
    return this.httpClient.get<iBlog[]>(dataUrl).pipe(catchError(this.handleError));
  }

  //get single blog
  public getBlog(blogId: number):Observable<iBlog>{
    let dataUrl: string = `${this.serverUrl}/blogs/${blogId}`;
    return this.httpClient.get<iBlog>(dataUrl).pipe(catchError(this.handleError));
  }

  //create blog
  public createBlog(blog: iBlog):Observable<iBlog>{
    let dataUrl: string = `${this.serverUrl}/blogs`;
    return this.httpClient.post<iBlog>(dataUrl, blog).pipe(catchError(this.handleError));
  }

  //update blog
  public updateBlog(blog: iBlog, blogId: number ):Observable<iBlog>{
    let dataUrl: string = `${this.serverUrl}/blogs/${blogId}`;
    return this.httpClient.put<iBlog>(dataUrl, blog).pipe(catchError(this.handleError));
  }

   //delete blog
   public deleteBlog(blogId: number ):Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/blogs/${blogId}`;
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
    return throwError(() => new Error(errorMessage));
  }
}
