import { Component, Input, OnInit } from '@angular/core';
import { BlogCommentViewModel } from '../../../models/blog-comment/blog-comment-view-model.model';
import { BlogComment } from '../../../models/blog-comment/blog-comment.model';
import { AccountService } from '../../../services/account.service';
import { BlogCommentService } from '../../../services/blog-comment.service';
import { CommonModule } from '@angular/common';
import { CommentBoxComponent } from "../comment-box/comment-box.component";
import { CommentsComponent } from "../comments/comments.component";

@Component({
    selector: 'app-comment-system',
    standalone: true,
    templateUrl: './comment-system.component.html',
    styleUrl: './comment-system.component.css',
    imports: [CommonModule, CommentBoxComponent, CommentsComponent]
})
export class CommentSystemComponent implements OnInit {
  @Input() blogId: number | any;

  standAloneComment: BlogCommentViewModel | any;
  blogComments: BlogComment[] | any;
  blogCommentViewModels: BlogCommentViewModel[] | any;

  constructor(
    private blogCommentService: BlogCommentService,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.blogCommentService.getAll(this.blogId).subscribe(blogComments => {

      if (this.accountService.isLoggedIn()) {
        this.initComment(this.accountService.currentUserValue!.username);
      }

      this.blogComments = blogComments;
      this.blogCommentViewModels = [];

      for (let i=0; i<this.blogComments.length; i++) {
        if (!this.blogComments[i].parentBlogCommentId) {
          this.findCommentReplies(this.blogCommentViewModels, i);
        }
      }

    });
  }

  initComment(username: string) {
    this.standAloneComment = {
      parentBlogCommentId: null,
      content: '',
      blogId: this.blogId,
      blogCommentId: -1,
      username: username,
      publishDate: null,
      updateDate: null,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    };
  }

  findCommentReplies(blogCommentViewModels: BlogCommentViewModel[], index: number) {

    let firstElement = this.blogComments[index];
    let newComments: BlogCommentViewModel[] = [];

    let commentViewModel: BlogCommentViewModel = {
      parentBlogCommentId: firstElement.parentBlogCommentId || null,
      content: firstElement.content,
      blogId: firstElement.blogId,
      blogCommentId: firstElement.blogCommentId,
      username: firstElement.username,
      publishDate: firstElement.publishDate,
      updateDate: firstElement.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: newComments
    }

    blogCommentViewModels.push(commentViewModel);

    for (let i=0; i<this.blogComments.length; i++) {
      if (this.blogComments[i].parentBlogCommentId === firstElement.blogCommentId) {
        this.findCommentReplies(newComments, i);
      }
    }
  }

  onCommentSaved(blogComment: BlogComment) {
    let commentViewModel: BlogCommentViewModel = {
      parentBlogCommentId: blogComment.parentBlogCommentId!,
      content: blogComment.content,
      blogId: blogComment.blogId,
      blogCommentId: blogComment.blogCommentId,
      username: blogComment.username,
      publishDate: blogComment.publishDate,
      updateDate: blogComment.updateDate,
      isEditable: false,
      deleteConfirm: false,
      isReplying: false,
      comments: []
    }

    this.blogCommentViewModels.unshift(commentViewModel);
  }
}
