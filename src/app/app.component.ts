import { Component, OnInit } from '@angular/core';
import { FileUpload, UploadService } from './upload.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
