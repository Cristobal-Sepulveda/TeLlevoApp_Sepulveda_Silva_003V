import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import {
  MenuController,
  ToastController,
  IonList,
  AlertController,
} from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('mapa') mapRef: ElementRef;
  map: GoogleMap;

  constructor(
    private alertController: AlertController,
    private appComponent: AppComponent,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.createMap();
  }

  setOpen(cerrar) {
    this.appComponent.setOpen(cerrar);
  }

  async createMap() {
    try {
      this.map = await GoogleMap.create({
        id: 'my-map',
        apiKey: environment.mapsKey,
        element: this.mapRef.nativeElement,
        forceCreate: true,
        config: {
          center: {
            lat: -33.511223518151574,
            lng: -70.75249219999999,
          },
          zoom: 11,
        },
      });
      this.addMarkers();
      this.addListeners();
    } catch (e) {
      console.log(e.message);
    }
  }

  async addListeners() {
    await this.map.setOnMarkerClickListener(async (marker) => {
      this.confirmarViaje();
      //console.log(marker);
    });
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -33.66262555821578,
          lng: -70.92710932183128,
        },
        title: 'Talagante',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.53575940101408,
          lng: -70.77295419379048,
        },
        title: 'MidMall Outlet Maipú',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.50657657391993,
          lng: -70.77460335317653,
        },
        title: 'Hospital el Carmen',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.48012660742549,
          lng: -70.75176253732761,
        },
        title: 'Mall Arauco Maipú',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.495946424557715,
          lng: -70.73682799702556,
        },
        title: 'Lumen con Tres Nte',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.576690967990565,
          lng: -70.82447076959471,
        },
        title: 'Padre Hurtado',
        snippet: '',
      },
      {
        coordinate: {
          lat: -33.60521010061784,
          lng: -70.87837207899629,
        },
        title: 'Peñaflor',
        snippet: '',
      },
      ,
    ];
    await this.map.addMarkers(markers);
  }

  async confirmarViaje() {
    const alert = await this.alertController.create({
      header: '¿Programar viaje en este destino?',
      buttons: [
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: async () => {
            this.router.navigateByUrl('/inicio', { replaceUrl: true });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  ngOnInit() {}
}
