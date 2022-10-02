import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iBlog } from '../../blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blogForm!: FormGroup;
  public loading: boolean = false;
  public blogId: any |null = null;
  public blog: iBlog = {} as iBlog;
  public errorMessage: string | null = null;
  
  constructor(private formBuilder: FormBuilder, private router: Router, private blogService:BlogService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.blogForm = this.formBuilder.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      comments: [''],
    });
    
    this.activatedRoute.paramMap.subscribe((param) => {
      this.blogId = param.get('blogId');
    });

    if(this.blogId){
      this.loading = true;
      this.blogService.getBlog(this.blogId).subscribe((data)=> {
        //this.blog = data;
        this.blogForm.get("title")?.setValue(data.title);
        this.blogForm.get("description")?.setValue(data.description);
        this.blogForm.get("author")?.setValue(data.author);
        this.blogForm.get("comments")?.setValue(data.comments);
        this.loading = false;
      },(error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

  submit() {
    if(this.router.url.includes('add')){
      if (!this.blogForm.valid) {
        return;
      }else{
        this.blog = this.blogForm.value;
        console.log(this.blogForm.value);
        this.blogService.createBlog(this.blog).subscribe((data)=> {
            this.router.navigate(['blog/admin']);
        }, (error) => {
          this.errorMessage = error;
          this.router.navigate(['blog/add']).then();
        });
      }
    }else{
      if(this.blogId){
        if (!this.blogForm.valid) {
          return;
        }else{
          this.blog = this.blogForm.value;
          console.log(this.blogForm.value);
          this.blogService.updateBlog(this.blog, this.blogId).subscribe((data)=> {
              this.router.navigate(['blog/admin']);
          }, (error) => {
            this.errorMessage = error;
            this.router.navigate([`blog/edit/${this.blogId}`]).then();
          });
        }
      }
    }
  }

  hasRoute(route: string){
    return this.router.url.includes(route);
  }
}
