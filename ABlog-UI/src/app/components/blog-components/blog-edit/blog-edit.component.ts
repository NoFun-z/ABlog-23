import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TypeaheadMatch, TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { BlogCreate } from '../../../models/blog/blog-create.model';
import { Blog } from '../../../models/blog/blog.model';
import { Photo } from '../../../models/photo/photo.model';
import { BlogService } from '../../../services/blog.service';
import { PhotoService } from '../../../services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TypeaheadModule],
  templateUrl: './blog-edit.component.html',
  styleUrl: './blog-edit.component.css'
})
export class BlogEditComponent implements OnInit {
  blogForm: FormGroup | any;
  confirmImageDelete: boolean = false;
  userPhotos: Photo[] = [];
  blogId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private photoService: PhotoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.blogId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.blogForm = this.formBuilder.group({
      blogId: this.blogId,
      title: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(300),
        Validators.maxLength(5000),
      ]],
      photoDescription: [null],
      photoId: [null]
    });

    this.photoService.getByApplicationUserId().subscribe(userPhotos => {
      this.userPhotos = userPhotos;
    });

    if (this.blogId && this.blogId !== -1) {
      this.blogService.get(this.blogId).subscribe(blog => {
        console.log(blog);
        this.updateForm(blog);
      });
    }
  }

  getPhoto(photoId: number) {
    for (let i = 0; i < this.userPhotos.length; i++) {
      if (this.userPhotos[i].photoId === photoId) {
        return this.userPhotos[i];
      }
    }

    return null;
  }

  isTouched(field: string) {
    return this.blogForm.get(field).touched;
  }

  hasErrors(field: string) {
    return this.blogForm.get(field).errors;
  }

  hasError(field: string, error: string) {
    return !!this.blogForm.get(field).hasError(error);
  }

  isNew() {
    return parseInt(this.blogForm.get('blogId').value) === -1;
  }

  detachPhoto() {
    this.blogForm.patchValue({
      photoId: null,
      photoDescription: null
    });
  }

  updateForm(blog: Blog) {
    let photoDescription = this.getPhoto(blog.photoId!)?.description;

    this.blogForm.patchValue({
      blogId: blog.blogId,
      title: blog.title,
      content: blog.content,
      photoId: blog.photoId?? null,
      photoDescription: photoDescription?? ''
    });
  }

  onSelect(event: TypeaheadMatch): void {
    let chosenPhoto: Photo = event.item;

    this.blogForm.patchValue({
      photoId: chosenPhoto.photoId,
      photoDescription: chosenPhoto.description
    });
  }

  onSubmit() {

    let blogCreate: BlogCreate = new BlogCreate(
      this.blogForm.get("blogId").value,
      this.blogForm.get("title").value,
      this.blogForm.get("content").value,
      this.blogForm.get("photoId").value
    );

    this.blogService.create(blogCreate).subscribe(createdBlog => {
      this.updateForm(createdBlog);
      this.toastr.info("Blog saved.");
    })
  }
}
