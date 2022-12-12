import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, IonList } from '@ionic/angular';
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

  ir_a_mapa() {
    //asd
    this.router.navigateByUrl('/mapa', { replaceUrl: true });
  }

  ngOnInit() {
    this.form_inputs = this.fb.group({
      tipo_vehiculo: ['', [Validators.required]],
      patente: ['', [Validators.required, Validators.required]],
      pasajeros: ['', [Validators.required, Validators.required]],
    });
  }
}
