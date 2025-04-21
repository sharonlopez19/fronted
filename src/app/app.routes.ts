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
import { FormvacacionesComponent } from './pages/formvacaciones/formvacaciones.component';
import { NotificacionesAdminComponent } from './pages/notificaciones-admin/notificaciones-admin.component';
import { AreaComponent } from './pages/directorio/area/area.component';
import { UsuariosComponent } from './pages/directorio/usuarios/usuarios.component';
import { TrazabilidadComponent } from './pages/directorio/trazabilidad/trazabilidad.component';
import { ContratosComponent } from './pages/directorio/contratos/contratos.component';

//import { FormhorasExtraComponent} from './pages/formhoras-extra/formhoras-extra.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Ruta para login
  { path: 'login', component: LoginComponent },

  // Ruta para registro
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas por el AuthGuard
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
      { path: 'directorio/area', component: AreaComponent },
      { path: 'directorio/usuarios', component: UsuariosComponent },
      { path: 'directorio/contratos', component: ContratosComponent },
      { path: 'directorio/trazabilidad', component: TrazabilidadComponent },
      //{ path: 'formhoras-extra', component: FormhorasExtraComponent }
    ]
  },

  // Redirección predeterminada a /login si no hay rutas coincidentes
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Ruta "catch-all" para redirigir a /login
  { path: '**', redirectTo: 'login' }
];

export const appRouting = provideRouter(routes);
