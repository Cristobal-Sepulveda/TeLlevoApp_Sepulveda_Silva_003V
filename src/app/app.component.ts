import { Component } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from '../environments/environment';

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
  constructor() {
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
      name: 'Programar Viaje de Retorno',
      redirecTo: '/alert',
    },
    {
      icon: 'locate-outline',
      name: 'Ver Vehículos Disponibles',
      redirecTo: '/action-sheet',
    },
    {
      icon: 'person-outline',
      name: 'Perfil',
      redirecTo: '/card',
    },
  ];
}
