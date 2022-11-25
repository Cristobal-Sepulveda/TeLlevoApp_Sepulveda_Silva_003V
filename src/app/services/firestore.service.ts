import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  getDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { time } from 'console';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  db = getFirestore();
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  async getUserProfile(): Promise<any> {
    try {
      const user = this.auth.currentUser;
      const docRef = doc(this.db, 'Usuarios', user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.data().nombre;
    } catch (e) {
      console.log(e.message);
    }
  }

  async uploadUserToFirestore(usuario, userUid) {
    // const user = this.auth.currentUser;

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
      return null;
    }
  }
}
