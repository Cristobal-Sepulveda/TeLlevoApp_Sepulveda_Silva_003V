import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { time } from 'console';

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
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  // Este metodo me entrega todos los usuarios en firestore_cloud
  async getUserProfile(): Promise<any> {
    try {
      // constantes de uso
      const user = this.auth.currentUser;
      const docRef = doc(this.db, 'Usuarios', user.uid);
      const docSnap = await getDoc(docRef);

      const aux = await docSnap.data();
      // logs de debugeo

      await docSnap.data().then((usuario_document) => {
        if (usuario_document.conductor === true) {
          console.log('El usuario es conductor');
          return docSnap.data();
        } else {
          console.log('@@@ Inicio\n', aux);
        }
      });

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
        conductor: false,
      });
      return true;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }

  /** 
   *
     Este metodo setea el atributo conductor de un usuario en la
     firestore_cloud a true*/
  async pasar_usuario_a_modo_conductor() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.db, `Usuarios`, user.uid);
    const docSnap = await getDoc(userDocRef);
    const usuario = docSnap.data();
    usuario.conductor = !usuario.conductor;
    usuario.mostarMenuConductor = true;
    updateDoc(userDocRef, usuario);
    return usuario.conductor;
  }
}
