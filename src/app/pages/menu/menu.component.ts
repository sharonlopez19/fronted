import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isCollapsed = false;
  isSubmenuOpen = false;
  isSubmenuVacantesOpen = false;

  usuario: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      console.log('Usuario cargado:', this.usuario);
    } else {
      console.log('No hay usuario en localStorage');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSubmenu(): void {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  toggleSubmenuVacantes(): void {
    this.isSubmenuVacantesOpen = !this.isSubmenuVacantesOpen;
  }
}
