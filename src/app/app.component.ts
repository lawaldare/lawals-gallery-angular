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
    // this.uploadService
    //   .getFiles()
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => {
    //       return changes.map((image) => ({
    //         key: image.payload.key,
    //         ...image.payload.val(),
    //       }));
    //     })
    //   )
    //   .subscribe((files) => {
    //     this.files = files;
    //   });

    // setInterval(this.change.bind(this), this.numberOfSeconds);
    setInterval(this.change, this.numberOfSeconds);
  }

  change() {
    let div = document.querySelector('section');
    let num = Math.floor(Math.random() * 231) + 1;
    // console.log(this.files[num].url);

    if (div) {
      // div.innerHTML = `<img src='${this.files[num].url}'>`;
      div.innerHTML = `<img src='assets/images/${num}.jpg'>`;
    }
  }
}
