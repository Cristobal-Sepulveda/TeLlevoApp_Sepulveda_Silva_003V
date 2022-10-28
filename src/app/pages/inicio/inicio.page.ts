import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';
import { IonModal } from '@ionic/angular';
import {
  ServicedatosService,
  Usuario,
} from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  profile = null;
  newUsuario: Usuario = <Usuario>{};
  constructor(
    private menuController: MenuController,
    private storageService: ServicedatosService
  ) {}

  @ViewChild('map') mapView: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  ionViewDidEnter() {
    this.createMap();
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  createMap() {
    const boundingRect =
      this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5,
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: 'normal', // hybrid, satellite, terrain
      });

      this.showCurrentPosition();
    });
  }

  async showCurrentPosition() {
    // todo
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }

  ngOnInit() {
    this.profile = this.storageService.getUsuarios;
  }
}
