import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Vacacion {
  idVacaciones: number;
  descrip: string;
  archivo: string;
  fechaInicio: string;
  fechaFinal: string;
  contratoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class VacacionesService {
  private apiUrl = 'http://localhost:8000/api/vacaciones';

  constructor(private http: HttpClient) {}

  obtenerVacaciones(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        console.log('Respuesta del backend (vacaciones):', res);
        return res.vacaciones;
      })
    );
  }

  obtenerVacacion(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarVacacion(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  editarVacacion(vacacion: Vacacion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${vacacion.idVacaciones}`, vacacion);
  }

  eliminarVacacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarVacacionParcial(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/actualizar`, formData);
  }

  obtenerContrato(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/contrato/${id}`);
  }
}
