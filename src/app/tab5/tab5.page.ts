import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {
  mensaje: string | undefined;

  constructor() {}

  async checkNetworkStatus() {
    // Obtener el estado inicial de la red
    const status = await Network.getStatus();
    //this.mensaje = ( "Estado de la red:" + status.coneccted ? 'Desconectado' : 'Conectado' );
    if (status.connected) {
      this.mensaje = 'Estado de la red: Conectado';
    } else {
      this.mensaje = 'Estado de la red: Desconectado';
    }

    //Escuchar cambios en el estado de la red

    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        this.mensaje =
          'Estado de la red: Conectado ----- Tipo de conexión: ' +
          status.connectionType;
      } else {
        this.mensaje =
          'Estado de la red: Desconectado ----- Tipo de conexión: ' +
          status.connectionType;
      }
    });
  }
}
