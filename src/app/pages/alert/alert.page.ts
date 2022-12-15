import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, IonList } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController,
    private fb: FormBuilder,
    private menuController: MenuController,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  setOpen(cerrar) {
    this.appComponent.setOpen(cerrar);
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  volver() {
    this.router.navigateByUrl('/inicio', { replaceUrl: true });
  }

  async faltanDatos() {
    const alert = await this.alertController.create({
      header: 'Debe completar todos los campos',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {},
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  cargarViaje() {
    const viaje = this.form_inputs.value;
    if (
      viaje.patente === '' ||
      viaje.hora_de_salida === '' ||
      viaje.pasajeros === ''
    ) {
      return this.faltanDatos();
    }

    this.appComponent.viaje.patente = viaje.patente;
    this.appComponent.viaje.hora_de_salida = viaje.hora_de_salida;
    this.appComponent.viaje.pasajeros = viaje.pasajeros;
    this.router.navigateByUrl('/mapa', { replaceUrl: true });
  }

  ngOnInit() {
    this.form_inputs = this.fb.group({
      patente: ['', [Validators.required]],
      hora_de_salida: ['', [Validators.required]],
      pasajeros: ['', [Validators.required, Validators.required]],
    });
  }
}
