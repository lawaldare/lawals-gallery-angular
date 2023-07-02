import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  selectedFiles?: FileList;

  constructor(private uploadService: UploadService) {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles?.length) {
      Array.from(this.selectedFiles).forEach((file) => {
        if (file) {
          const currentFileUpload = {
            file,
            name: file.name,
          };
          this.uploadService.pushFileToStorage(currentFileUpload).subscribe();
        }
      });
      this.selectedFiles = undefined;
    }
  }
}
