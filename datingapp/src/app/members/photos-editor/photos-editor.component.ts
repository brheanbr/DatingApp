import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photos-editor',
  templateUrl: './photos-editor.component.html',
  styleUrls: ['./photos-editor.component.css']
})
export class PhotosEditorComponent implements OnInit {
  @Input() photos: Photo[];
  // @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;
  response: string;
  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {
  }
  ngOnInit() {
    this.initializeUploader();

  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader ({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          Id: res.Id,
          Url: res.Url,
          DateAdded: res.DateAdded,
          Description: res.Description,
          IsMain: res.IsMain
        };
        this.photos.push(photo);
      }
    };
  }


  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.Id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.IsMain === true) [0];
      this.currentMain.IsMain = false;
      photo.IsMain = true;
      this.authService.changeMemberPhoto(photo.Url);
      this.authService.currentUser.PhotoUrl = photo.Url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      this.alertify.success('Successfuly set the main photo');
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.Id === id), 1);
        this.alertify.error('Photo has been deleted');
        }, error => {
          this.alertify.warning(error);
       });
    });
  }


}
