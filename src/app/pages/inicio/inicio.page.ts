import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { IonModal } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import {
  ServicedatosService,
  Usuario,
} from 'src/app/services/servicesdatos.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(
    private menuController: MenuController,
    private storageService: ServicedatosService,
    private appComponent: AppComponent,
    private firestoreService: FirestoreService
  ) {}
  username = null;
  newUsuario: Usuario = <Usuario>{};
  setOpen(cerrar) {
    this.appComponent.setOpen(cerrar);
  }

  @ViewChild('map') mapView: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  // ionViewDidEnter() {
  //   this.createMap();
  // }

  async mostrarMenu() {
    this.menuController.open('first');
  }

  ngOnInit() {
    this.firestoreService.getUserProfile().then((username) => {
      this.username = username;
    });
    this.appComponent.showTabs = true;
  }
}
