import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  { path: 'upload', component: UploadImageComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
