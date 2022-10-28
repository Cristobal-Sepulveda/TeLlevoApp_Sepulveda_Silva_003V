import { Component, NgModule, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IonModal, IonTabBar } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

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

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonTabBar) tabbar: IonTabBar;
  isModalOpen = false;
  showTabs = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  async logout() {
    await this.authService.logout();
    this.isModalOpen = false;
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

  ngOnInit() {}
}
