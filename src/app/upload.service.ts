import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface FileUpload {
  key?: string;
  name?: string;
  url?: string;
  file?: File;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private basePath = '/uploads';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file?.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(): AngularFireList<any> {
    return this.db.list(this.basePath);
  }

  deleteFile(fileUpload: FileUpload): void {
    if (fileUpload.key) {
      this.deleteFileDatabase(fileUpload.key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name ?? '');
        })
        .catch((error) => console.log(error));
    }
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  // public deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }

  // public deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);

  //   storageRef
  //     .child(name)
  //     .delete()
  //     .subscribe({
  //       next: () => console.log(`Storage deleted: ${name}`),
  //       error: (err) => console.error('Delete failed:', err),
  //     });
  // }

  public deleteFromDbOnly(key: string) {
    this.db
      .object(`uploads/${key}`)
      .remove()
      .then(() => console.log('DB entry deleted:', key))
      .catch((err) => console.error(err));
  }

  public deleteFileStorage(name: string) {
    this.storage
      .ref(this.basePath)
      .child(name)
      .delete()
      .subscribe({
        next: () => console.log('deleted'),
        error: (e) => console.error(e),
      });
  }
}
