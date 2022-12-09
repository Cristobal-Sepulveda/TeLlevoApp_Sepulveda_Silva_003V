import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Datos {
  id: number;
  nomMascota: string;
  razaMascota: string;
  edadMascota: number;
  modified: number;
}

export interface Usuario {
  user: string;
  modified: number;
}

const ITEMS_KEY = 'my-datos';
const USERS_KEYS = 'users-keys';

@Injectable({
  providedIn: 'root',
})
export class ServicedatosService {
  private _storage: Storage;

  constructor(private storage: Storage) {
    this.init();
  }
  //definimos en un método la creación del almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addUsuario(usuario: Usuario): Promise<any> {
    return this.storage.get(USERS_KEYS).then((usuarios: Usuario[]) => {
      if (usuarios) {
        usuarios.push(usuario);
        return this.storage.set(USERS_KEYS, usuarios);
      } else {
        return this.storage.set(USERS_KEYS, [usuario]);
      }
    });
  }

  async updateUsuario(usuario: Usuario): Promise<any> {
    return this.storage.get(USERS_KEYS).then((usuarios: Usuario[]) => {
      if (!usuarios || usuarios.length === 0) {
        return null;
      }
      let newUsuario: Usuario[] = [];
      for (let i of usuarios) {
        if (i.user === usuario.user) {
          newUsuario.push(usuario);
        } else {
          newUsuario.push(i);
        }
      }
      return this.storage.set(USERS_KEYS, newUsuario);
    });
  }

  async getUsuarios(): Promise<Usuario[]> {
    const users = await this.storage.get(USERS_KEYS);
    return users;
  }

  async addDatos(dato: Datos): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (datos) {
        datos.push(dato);
        return this.storage.set(ITEMS_KEY, datos);
      } else {
        return this.storage.set(ITEMS_KEY, [dato]);
      }
    });
  }

  getDatos(): Promise<Datos[]> {
    return this.storage.get(ITEMS_KEY);
  }

  async updateDatos(dato: Datos): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (!datos || datos.length === 0) {
        return null;
      }
      let newDato: Datos[] = [];
      for (let i of datos) {
        if (i.id === dato.id) {
          newDato.push(dato);
        } else {
          newDato.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newDato);
    });
  }

  async deleteDatos(id: number): Promise<Datos> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (!datos || datos.length === 0) {
        return null;
      }
      let toKeep: Datos[] = [];
      for (let i of datos) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}
