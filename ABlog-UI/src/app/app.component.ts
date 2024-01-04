import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BlogComponent } from './components/blog-components/blog/blog.component';
import { BlogCardComponent } from './components/blog-components/blog-card/blog-card.component';
import { BlogEditComponent } from './components/blog-components/blog-edit/blog-edit.component';
import { BlogsComponent } from './components/blog-components/blogs/blogs.component';
import { CommentBoxComponent } from './components/comment-components/comment-box/comment-box.component';
import { CommentSystemComponent } from './components/comment-components/comment-system/comment-system.component';
import { CommentsComponent } from './components/comment-components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhotoAlbumComponent } from './components/photo-album/photo-album.component';
import { SummaryPipe } from './pipes/summary.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, SummaryPipe,
    BlogComponent,
    BlogEditComponent,
    BlogsComponent,
    CommentBoxComponent,
    CommentSystemComponent,
    CommentsComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
    PhotoAlbumComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'ABlog-UI';
}
