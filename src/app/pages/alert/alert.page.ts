import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MenuController, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  form_inputs: FormGroup;
  @ViewChild('myList') myList: IonList;
  esConductor = true;

  constructor(
    private fb: FormBuilder,
    private ToastController: ToastController,
    private menuController: MenuController,
    private router: Router
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

  ngOnInit() {
    console.log('Abriendo formulario crear conductor');
    this.form_inputs = this.fb.group({
      tipo_vehiculo: ['', [Validators.required]],
      patente: ['', [Validators.required, Validators.required]],
      pasajeros: ['', [Validators.required, Validators.required]],
    });
  }
}
