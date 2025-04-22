import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  user:any=null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    
    document.body.classList.add('login-background');

   
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
   
    document.body.classList.remove('login-background');
  }

  login(): void {
    const data = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:8000/api/login', data).subscribe({
        next: (res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                if (res.user) {
                    localStorage.setItem('usuario', JSON.stringify(res.user));
                }
                if (res.user.rol == 1 || res.user.rol == 4) {
                    this.router.navigate(['/directorio/usuarios']);
                } else {
                    this.router.navigate(['/home']);
                }
                this.errorMessage = '';
            } else {
                this.errorMessage = 'Respuesta inválida del servidor.';
            }
        },
        error: (err) => {
            this.errorMessage = 'Correo o contraseña incorrectos.';
        }
    });
  }


}
