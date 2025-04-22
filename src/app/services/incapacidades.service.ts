import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Incapacidad {
  idIncapacidad: number;
  descrip: string;
  archivo: string;
  fechaInicio: string;
  fechaFinal: string;
  contratoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class IncapacidadesService {
  private apiUrl = 'http://localhost:8000/api/incapacidad';

  constructor(private http: HttpClient) {}

  obtenerIncapacidades(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        console.log('Respuesta del backend:', res);
        return res.incapacidad;
      })
    );
  }

  obtenerIncapacidad(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarIncapacidad(formData: FormData) {
    return this.http.post<any>('http://127.0.0.1:8000/api/incapacidad', formData);
  }
  
  editarIncapacidad(incapacidad: Incapacidad): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${incapacidad.idIncapacidad}`,
      incapacidad
    );
  }

  eliminarIncapacidad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  actualizarIncapacidadParcial(
    id: number,
    formData: FormData
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/actualizar`, formData);
  }

  obtenerContrato(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/contrato/${id}`);
  }
}
