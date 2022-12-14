import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
  collection,
} from '@angular/fire/firestore';

/** FIRESTORE.SERVICE.TS */
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  /**
   *
     Aqui hago la conexión con la FIRESTORE_DB */
  db = getFirestore();

  //Constructor
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Este metodo me entrega todos los usuarios en firestore_cloud
  async getUserProfile(): Promise<any> {
    try {
      // constantes de uso
      const user = this.auth.currentUser;
      const docRef = doc(this.db, 'Usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      // Salida con exito
      return docSnap.data();
    } catch (e) {
      // Salida sin exito
      console.log(e.message);
    }
  }

  // Este metodo guarda usuarios en firestore_cLoud
  async uploadUserToFirestore(usuario, userUid) {
    try {
      const userDocRef = doc(this.firestore, `Usuarios/`, userUid, `/`);
      await setDoc(userDocRef, {
        nombre: usuario.nombre,
        correo: usuario.email,
        contraseña: usuario.password,
      });
      return true;
    } catch (e) {
      console.log(e.message);
      return;
    }
  }

  async subirViajeAFirestore(viaje) {
    try {
      console.log(viaje);
      const user = this.auth.currentUser;
      const userDocRef = doc(this.firestore, `Viajes/`, user.uid);
      await setDoc(userDocRef, {
        patente: viaje.patente,
        pasajeros: viaje.pasajeros,
        hora_de_salida: viaje.hora_de_salida,
        title: viaje.title,
      });
    } catch (e) {
      console.log(e.message);
      return;
    }
  }

  async obtenerViajesDesdeFirestore() {
    try {
      const colRef = collection(this.db, 'Viajes');
      const docsSnap = await getDocs(colRef);
      return docsSnap;
    } catch (e) {
      console.log(e.message);
    }
  }
}
