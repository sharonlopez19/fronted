import { Routes, provideRouter } from '@angular/router';

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

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 🔓 Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔒 Rutas protegidas agrupadas bajo el guard
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'directorio', component: DirectorioComponent },
      { path: 'vacantes', component: VacantesComponent },
      { path: 'vacaciones', component: VacacionesComponent },
      { path: 'incapacidades', component: IncapacidadesComponent },
      { path: 'horas-extra', component: HorasExtraComponent },
      { path: 'notificaciones', component: NotificacionesComponent }
    ]
  },

  // 🔁 Redirección a login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🚫 Ruta comodín para redirigir cualquier otra URL inválida
  { path: '**', redirectTo: 'login' }
];

export const appRouting = provideRouter(routes);
