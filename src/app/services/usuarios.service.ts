import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
// o desde donde tengas el modelo
export interface Usuarios {
  numDocumento: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  email: string;
  direccion: string;
  password:string;
  nacionalidadId?: number | null;
  epsCodigo?: string | null;
  generoId?: number | null;
  tipoDocumentoId?: number | null;
  estadoCivilId?: number | null;
  pensionesCodigo?: string | null;
  // Agrega más campos si los necesitas en el frontend
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        console.log('Respuesta del backend:', res); // 👈 esto
        return res.usuario;
      })
    );
  }
  agregarUsuario(usuario: any) {
    return this.http.post<Usuarios>('http://localhost:8000/api/usuarios', usuario);
  }
  
  obtenerNacionalidades(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/nacionalidad').pipe(
      map(res => res.Nacionalidad) // 👈 Esto extrae el array
    );
  }
  actualizarUsuarioParcial(id: number, datos: Partial<Usuarios>): Observable<any> {
    return this.http.patch<any>(`http://localhost:8000/api/usuarios/${id}`, datos);
  }
  
  obtenerEps(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/epss').pipe(
      map(res => res.Eps) // 👈 Ajusta según la estructura real
    );
  }
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/usuarios/${id}`);
  }
  obtenerUsuario(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/usuarios/${id}`);
  }
  
  obtenerGeneros(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/genero').pipe(
      map(res => res.Genero) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerTiposDocumento(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/tipodocumento').pipe(
      map(res => res.TipoDocumento) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerEstadosCiviles(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/estadocivil').pipe(
      map(res => res.EstadoCivil) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerPensiones(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/pensiones').pipe(
      map(res => res.Pensiones) // 👈 Ajusta según la estructura real
    );
  }
  
  
  
}

