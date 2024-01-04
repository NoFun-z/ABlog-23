import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../models/blog/blog.model';
import { BlogService } from '../../../services/blog.service';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-famous-blogs',
    standalone: true,
    templateUrl: './famous-blogs.component.html',
    styleUrl: './famous-blogs.component.css',
    imports: [BlogCardComponent, CommonModule]
})
export class FamousBlogsComponent implements OnInit{
  famousBlogs: Blog[] = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.blogService.getMostFamous().subscribe(blogs => {
      this.famousBlogs = blogs;
    });
  }
}
