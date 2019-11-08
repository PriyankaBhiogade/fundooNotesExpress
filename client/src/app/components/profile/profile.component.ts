import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper'
import { DataService } from '../../services/data.service'
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // dialogRef: any;
  profile: any
  onclickEvent: any = ' '
  croppedImage: any = '';
  uploadData;
  uploadedFiles: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ProfileComponent>,
    private dataSevice: DataService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }
  fileChange(event) {
    this.onclickEvent = event;
    this.uploadedFiles = <File>event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.uploadData = event.file
  }

  uploadpic() {
    const uploadData = new FormData();
    uploadData.append('image', this.uploadData, this.uploadedFiles.name);
    this.userService.profile(uploadData).subscribe(
      (response: any) => {
        this.dataSharingService.uploadProfile(response.data);
        console.log("repsonse",response.data)
        localStorage.setItem('profile',response.data )
        // this.dataSevice.uploadProfile(response.data);
        this.dialogRef.close();

        this.snackbar.open('image uploaded Successfully..', 'End now', { duration: 1000 });
      },
      error => {
        console.log(error);
        this.snackbar.open('image not uploaded', 'End now', { duration: 1000 });
      }
    )
  }



}
