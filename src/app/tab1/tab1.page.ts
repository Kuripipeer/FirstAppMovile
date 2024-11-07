import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  photo: string | undefined;

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    // Guardar la imagen en formato base64
    this.photo = `data:image/jpeg;base64,${image.base64String}`;
  }

  constructor() {}
}
