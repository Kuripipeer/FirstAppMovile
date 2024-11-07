import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nombre: string | undefined;
  edad: number | undefined;
  ciudad: string | undefined;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  async init(){
    await this.storage.create();
  }

  // Guarda un valor en el almacenamiento
  async save(){
    await this.storage.set('nombre', this.nombre);
    await this.storage.set('edad', this.edad);
    await this.storage.set('ciudad', this.ciudad);
  }

  async load(){
    this.nombre = await this.storage.get('nombre');
    this.edad = await this.storage.get('edad');
    this.ciudad = await this.storage.get('ciudad');
  }

}
