import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;

  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleRegister(): void {
    this.container.nativeElement.classList.add('active');
  }

  toggleLogin(): void {
    this.container.nativeElement.classList.remove('active');
  }

  login(): void {
    console.log('Login con:', this.email, this.password);
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Token recibido:', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al loguear:', err);
        alert('Credenciales incorrectas');
      }
    });
  }

  onVacantes(): void {
    console.log('Ir a vacantes');
    this.router.navigate(['/register']);
  }
}
