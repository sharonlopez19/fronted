import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DirectorioComponent } from './pages/directorio/directorio.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  { path: 'directorio', component: DirectorioComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'register', component: RegisterComponent }
];
