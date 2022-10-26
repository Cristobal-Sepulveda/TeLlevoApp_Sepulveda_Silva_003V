import { Component, NgModule, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IonModal } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AnimationController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private menuController: MenuController,
    private router: Router,
    private animationCtrl: AnimationController
  ) {
    CapacitorGoogleMaps.initialize({
      key: environment.mapsKey,
    });
  }

  componentes: Componente[] = [
    {
      icon: 'map-outline',
      name: 'Pantalla Principal',
      redirecTo: '/inicio',
    },
    {
      icon: 'car-sport-outline',
      name: 'Registrarse como conductor',
      redirecTo: '/alert',
    },
    {
      icon: 'locate-outline',
      name: 'Ver Vehículos Disponibles',
      redirecTo: '/card',
    },
  ];
  @ViewChild('map') mapView: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

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

  async logout() {
    this.isModalOpen = false;
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(1)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  ngOnInit() {
    this.isModalOpen = true;
  }
}
