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
import { FormvacacionesComponent} from './pages/formvacaciones/formvacaciones.component';
import { NotificacionesAdminComponent } from './pages/notificaciones-admin/notificaciones-admin.component';
//import { FormhorasExtraComponent} from './pages/formhoras-extra/formhoras-extra.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

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
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'notificaciones-admin', component: NotificacionesAdminComponent },
      { path: 'formvacaciones', component: FormvacacionesComponent },
      //{ path: 'formhoras-extra', component: FormhorasExtraComponent}
    ]
  },


  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: '**', redirectTo: 'login' }
];

export const appRouting = provideRouter(routes);