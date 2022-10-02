import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iBlog } from '../../blog.model';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  @Input() blog?: iBlog | undefined;
  @Output() deleteBlogEmitter = new EventEmitter
  
  public loading: boolean = false;
  public blogs: iBlog[] = [];
  public errorMessage: string | null = null;

  constructor() {}
  
  public deleteBlog(blogId: any) {
    this.deleteBlogEmitter.emit(blogId);
  }

  ngOnInit(): void {}

}
