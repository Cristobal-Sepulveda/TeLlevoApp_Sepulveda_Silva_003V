import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  MenuController,
  Platform,
  ToastController,
  IonList,
} from '@ionic/angular';
import {
  ServicedatosService,
  Datos,
} from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  @ViewChild('myList') myList: IonList;

  constructor(
    private storageService: ServicedatosService,
    private plt: Platform,
    private ToastController: ToastController,
    private menuController: MenuController
  ) {
    this.plt.ready().then(() => {
      this.loadDatos();
    });
  }

  ngOnInit() {}

  mostrarMenu() {
    this.menuController.open('first');
  }

  loadDatos() {
    this.storageService.getDatos().then((datos) => {
      this.datos = datos;
    });
  }

  addDatos() {
    this.newDato.modified = Date.now();
    this.newDato.id = Date.now();
    this.storageService.addDatos(this.newDato).then((dato) => {
      this.newDato = <Datos>{};
      this.showToast('!Datos Agregados');
      this.loadDatos();
    });
  }

  updateDatos(dato: Datos) {
    dato.nomMascota = `UPDATED: ${dato.nomMascota}`;
    dato.modified = Date.now();
    this.storageService.updateDatos(dato).then((item) => {
      this.showToast('Elemento actualizado');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  deleteDatos(dato: Datos) {
    this.storageService.deleteDatos(dato.id).then((item) => {
      this.showToast('Elemento eliminado');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  async showToast(msg: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
