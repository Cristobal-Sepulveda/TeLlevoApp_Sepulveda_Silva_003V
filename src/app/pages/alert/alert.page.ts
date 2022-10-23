import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  handlerMessage='';
  roleMessage='';

  constructor(private alertController: AlertController, 
              private menuController: MenuController) { }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  //método que muestra un mensaje y un botón Ok
  async Saludo() {
    const alert = await this.alertController.create({
      header: 'Saludo',
      message: 'Bienvenid@ a mi App',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //método que muestra una alerta con dos opciones  de botón
  async Confirma() {
    const alert = await this.alertController.create({
      header: 'Quiere irse a su casa?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'El usuario no quiere irse a su casa';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'El usuario se fue a la casa';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  //método que permite ingresar datos
  async Inputs() {
    const alert = await this.alertController.create({
      header: 'Ingrese sus datos por favor..',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Nombre',
        },
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Cuéntanos acerca de ti..',
        },
      ],
    });

    await alert.present();
  }


}
