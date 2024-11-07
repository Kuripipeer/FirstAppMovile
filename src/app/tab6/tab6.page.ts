import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {
  users: any[] = [];
  datosGuardados: any[] = [];
  nombre = '';
  edad = 0;
  genero = '';
  ciudad = '';
  fechaN = '';
  correo = '';

  constructor(private databaseService: DatabaseService) {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.databaseService.getUsers();
    console.log(this.users);
  }

  async addUser() {
    if (this.nombre.trim()) {
      await this.databaseService.addUser(
        this.nombre,
        this.edad,
        this.genero,
        this.ciudad,
        this.fechaN,
        this.correo
      );
      this.nombre = '';
      this.edad = 0;
      this.genero = '';
      this.ciudad = '';
      this.fechaN = '';
      this.correo = '';
      this.loadUsers();
    }
  }

  async mostrarDatos() {
    this.datosGuardados = await this.databaseService.getUsers();
  }
}
