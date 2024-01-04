import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../../models/blog/blog.model';
import { BlogService } from '../../../services/blog.service';
import { PhotoService } from '../../../services/photo.service';
import { CommentSystemComponent } from "../../comment-components/comment-system/comment-system.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.css',
    imports: [CommonModule, CommentSystemComponent]
})
export class BlogComponent implements OnInit {
  blog: Blog | any;
  blogPhotoUrl: string | any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    const blogId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.blogService.get(blogId).subscribe(blog => {
      this.blog = blog;

      if (!!this.blog.photoId) {
        this.photoService.get(this.blog.photoId).subscribe(photo => {
          this.blogPhotoUrl = photo.imageUrl;
        });
      }
    });
  }
}
