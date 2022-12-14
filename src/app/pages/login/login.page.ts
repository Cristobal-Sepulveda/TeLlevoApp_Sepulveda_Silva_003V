import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AppComponent } from 'src/app/app.component';
import {
  ServicedatosService,
  Usuario,
} from 'src/app/services/servicesdatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  showLoginForm = true;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private appComponent: AppComponent,
    private storageService: ServicedatosService
  ) {}

  async addUsuarioAFirestoreYAuth() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.value);
    const userUid = user.user.uid;
    this.firestoreService.uploadUserToFirestore(
      this.credentials.value,
      userUid
    );
    await loading.dismiss();
    if (user) {
      this.router.navigateByUrl('/inicio', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  mostrarFormularioCrearCuenta = () => {
    this.showLoginForm = !this.showLoginForm;
  };

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/inicio', { replaceUrl: true });
      // this.addUsuario();
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  refreshPage() {
    if (this.appComponent.justLogged == true) {
      this.appComponent.justLogged = false;
      window.location.reload();
    }
  }

  ngOnInit() {
    this.appComponent.showTabs = false;
    this.refreshPage();
    this.credentials = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
