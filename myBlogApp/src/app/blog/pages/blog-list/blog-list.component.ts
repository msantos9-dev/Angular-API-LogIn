import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iBlog } from '../../blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  
  public loading: boolean = false;
  public blogs: iBlog[] = [];
  public errorMessage: string | null = null;

  commandBarAction(event:string){
      this.router.navigate(['blog/' + event]);
  }

  deleteBlog(event:any){
    if(event){
      this.blogService.deleteBlog(event).subscribe((data) => {
        this.loading = true;
        this.blogService.getAllBlogs().subscribe((data) => {
          this.blogs = data;
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
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
      this.loading = false;
    },(error) => {
      this.errorMessage = error;
      this.loading = false;
    });
    }
}
