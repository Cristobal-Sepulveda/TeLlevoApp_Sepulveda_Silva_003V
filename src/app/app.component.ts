import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IonModal, IonTabBar } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { FirestoreService } from './services/firestore.service';

interface Componente {
  icon: string;
  name: string;
  // redirecTo: string;
}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuController: MenuController,
    private router: Router,
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}
  componentes: Componente[] = [
    {
      icon: 'watch',
      name: 'futura funcionalidad',
      //name: '',
      //redirecTo: '/alert',
    },
    {
      icon: 'locate-outline',
      name: 'futura funcionalidad',
      //redirecTo: '/card',
    },
  ];

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonTabBar) tabbar: IonTabBar;
  isModalOpen = false;
  showTabs = false;
  justLogged = false;
  viaje = {
    patente: String,
    hora_de_salida: String,
    pasajeros: String,
    title: String,
  };

  ngOnInit() {
    console.log('app component');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  async logout() {
    try {
      this.isModalOpen = false;
      await this.authService.logout();
      this.justLogged = true;
      this.router.navigateByUrl('', { replaceUrl: true });
    } catch (e) {
      console.log(e.message);
    }
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
}
