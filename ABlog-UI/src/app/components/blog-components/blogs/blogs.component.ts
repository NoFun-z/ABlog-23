import { Component, OnInit } from '@angular/core';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { BlogPaging } from '../../../models/blog/blog-paging.model';
import { Blog } from '../../../models/blog/blog.model';
import { PagedResult } from '../../../models/blog/paged-result.model';
import { BlogService } from '../../../services/blog.service';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from "../blog-card/blog-card.component";

@Component({
    selector: 'app-blogs',
    standalone: true,
    templateUrl: './blogs.component.html',
    styleUrl: './blogs.component.css',
    imports: [CommonModule, PaginationModule, BlogCardComponent]
})
export class BlogsComponent implements OnInit{
  pagedBlogResult: PagedResult<Blog> | any;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.loadPagedBlogResult(1, 6);
  }

  pageChanged(event: PageChangedEvent) : void {
    this.loadPagedBlogResult(event.page, event.itemsPerPage);
  }

  loadPagedBlogResult(page: number, itemsPerPage: number) {
    let blogPaging = new BlogPaging(page, itemsPerPage);

    this.blogService.getAll(blogPaging).subscribe(pagedBlogs => {
      this.pagedBlogResult = pagedBlogs;
    });
  }
}
