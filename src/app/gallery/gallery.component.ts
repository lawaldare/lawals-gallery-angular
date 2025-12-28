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

    // setInterval(this.change.bind(this), this.numberOfSeconds);
    setInterval(this.change, this.numberOfSeconds);
  }

  change() {
    let div = document.querySelector('section');
    let num = Math.floor(Math.random() * 115) + 117;
    if (div) {
      //Firebase quota usuage exceeded workaround and it is not free anymore
      //So using local images instead of fetching from firebase storage
      // div.innerHTML = `<img src='${this.files[num].url}'>`;
      div.innerHTML = `<img src='assets/images/${num}.jpg'>`;
    }
  }
}
