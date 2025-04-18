import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  isCollapsed = false;

  usuario: any ={};
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
    localStorage.removeItem('usuario'); // Limpia también el usuario
    this.router.navigate(['/login']);

  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  navigateTo(path: string){
    this.router.navigate([path]);
  }
  isActive(path: string): boolean {
    return this.router.url === path;
  }
  
}
