import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DirectorioComponent } from './pages/directorio/directorio.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VacantesComponent } from './pages/vacantes/vacantes.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { IncapacidadesComponent } from './pages/incapacidades/incapacidades.component';
import { HorasExtraComponent } from './pages/horas-extra/horas-extra.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'directorio', component: DirectorioComponent },
  { path: 'vacantes', component: VacantesComponent },
  { path: 'vacaciones', component: VacacionesComponent },
  { path: 'incapacidades', component: IncapacidadesComponent },
  { path: 'horas-extra', component: HorasExtraComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
];
