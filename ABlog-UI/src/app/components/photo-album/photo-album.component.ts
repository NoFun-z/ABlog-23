import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from '../../models/photo/photo.model';
import { PhotoService } from '../../services/photo.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-photo-album',
  standalone: true,
  imports: [CommonModule, CarouselModule, FormsModule],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.css'
})
export class PhotoAlbumComponent implements OnInit{
  @ViewChild('photoForm') photoForm: NgForm | any;
  @ViewChild('photoUploadElement') photoUploadElement: ElementRef | any;

  photos: Photo[] = [];
  photoFile: any;
  newPhotoDescription: string | any;

  constructor(
    private photoService: PhotoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.photoService.getByApplicationUserId().subscribe(userPhotos => {
      this.photos = userPhotos;
    });
  }

  confirmDelete(photo: Photo) {
    photo.deleteConfirm = true;
  }

  cancelDeleteConfirm(photo: Photo) {
    photo.deleteConfirm = false;
  }

  deleteConfirmed(photo: Photo) {
    this.photoService.delete(photo.photoId).subscribe(() => {
      let index = 0;

      for (let i=0; i<this.photos.length; i++) {
        if (this.photos[i].photoId === photo.photoId) {
          index = i;
        }
      }

      if (index > -1) {
        this.photos.splice(index, 1);
      }

      this.toastr.info("Photo deleted.");
    });
  }

  onFileChange(event : any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photoFile = file;
    }
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.photoFile, this.newPhotoDescription);

    this.photoService.create(formData).subscribe(createdPhoto => {
      
      this.photoForm.reset();
      this.photoUploadElement.nativeElement.value = '';

      this.toastr.info("Photo uploaded");
      this.photos.unshift(createdPhoto);

    });
  }
}
