import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: SQLiteDBConnection | undefined;
  private sqlite: SQLiteConnection | undefined;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDabatabase() {
    try {
      const dbName = 'base_db';
      const isWeb = Capacitor.getPlatform() === 'web';
      this.db = await this.sqlite?.createConnection(
        dbName,
        isWeb,
        'no-encryption',
        1,
        false
      );

      if (this.db) {
        await this.db.open();
        console.log('database ------------- created');
      }

      const createTable = `
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL,
      genero TEXT NOT NULL,
      ciudad TEXT NOT NULL,
      fechaN TEXT NOT NULL,
      correo TEXT NOT NULL
    );
    `;
      await this.db?.execute(createTable);
      console.log('table ------------- created');
    } catch (e) {
      console.error('******** Error initializing database', e);
    }
  }

  async addUser(
    nombre: string,
    edad: number,
    genero: string,
    ciudad: string,
    fechaN: string,
    correo: string
  ) {
    const query = `INSERT INTO users (nombre, edad, genero, ciudad, fechaN, correo) VALUES (?, ?, ?, ?, ?, ?);`;
    await this.db?.run(query, [nombre, edad, genero, ciudad, fechaN, correo]);
    console.log('user ------------- added');
  }

  async getUsers() {
    const query = `SELECT * FROM users;`;
    const result = await this.db?.query(query);
    return result?.values || [];
  }

  async updateUser(
    id: number,
    nombre: string,
    edad: number,
    genero: string,
    ciudad: string,
    fechaN: string,
    correo: string
  ) {
    const query = `UPDATE users SET nombre = ?, edad = ?, genero = ?, ciudad = ?, fechaN = ?, correo = ? WHERE id = ?;`;
    await this.db?.run(query, [
      nombre,
      edad,
      genero,
      ciudad,
      fechaN,
      correo,
      id,
    ]);
  }

  async deleteUser(id: number) {
    const query = `DELETE FROM users WHERE id = ?;`;
    await this.db?.run(query, [id]);
  }
}
