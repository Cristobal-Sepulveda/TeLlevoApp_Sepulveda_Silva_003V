import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MenuController,
  ToastController,
  IonList,
  AlertController,
} from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  form_inputs: FormGroup;
  @ViewChild('myList') myList: IonList;
  esConductor = true;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private fb: FormBuilder,
    private ToastController: ToastController,
    private menuController: MenuController,
    private router: Router,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private appComponent: AppComponent
  ) {}

  mostrarMenu() {
    this.menuController.open('first');
  }
  login() {}

  volver() {
    this.router.navigateByUrl('/inicio', { replaceUrl: true });
  }

  async showToast(msg: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async confirma() {
    const alert = await this.alertController.create({
      header:
        'Su Perfil ha sido cambiado de pasajero a conductor. Vuelva a iniciar sesión.',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          handler: async () => {
            this.appComponent.logout();
          },
        },
        // {
        //   text: 'No',
        //   role: 'cancel',
        //   handler: () => {
        //     this.handlerMessage = 'El usuario se fue a la casa';
        //   },
        // },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  async editar_usuario_a_conductor() {
    this.firestoreService.pasar_usuario_a_modo_conductor();
    this.confirma();
  }

  ngOnInit() {
    this.form_inputs = this.fb.group({
      tipo_vehiculo: ['', [Validators.required]],
      patente: ['', [Validators.required, Validators.required]],
      pasajeros: ['', [Validators.required, Validators.required]],
    });
  }
}
