import { Component } from '@angular/core';
import { FileUpload, UploadService } from '../upload.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  numberOfSeconds = 3000;
  files: FileUpload[] = [];

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.uploadService
      .getFiles()
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((image) => ({
            key: image.payload.key,
            ...image.payload.val(),
          }));
        })
      )
      .subscribe(
        (filesFromDB: { key: string; name: string; url: string }[]) => {
          this.files = filesFromDB;
          console.log(this.files);
        }
      );

    setInterval(this.change.bind(this), this.numberOfSeconds);
  }

  change() {
    let div = document.querySelector('section');
    let num = Math.floor(Math.random() * this.files.length) + 1;

    if (div) {
      div.innerHTML = `<img src='${this.files[num].url}'>`;
    }
  }
}
