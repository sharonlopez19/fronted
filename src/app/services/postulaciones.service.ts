import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Postulacion {
  idPostulaciones?: number;
  fechaPostulacion: string;
  estado: 'Aceptado' | 'Rechazado' | 'Pendiente';
  vacantesId: number;
  
  userId?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

 
  private apiUrl = 'http://localhost:8000/api/postulaciones'; 
  private searchApiUrl = 'http://localhost:8000/api/postulaciones/buscar/vacante';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  getPostulaciones(): Observable<Postulacion[]> {
    console.log(`[PostulacionesService] Llamando a GET ${this.apiUrl}`);
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const postulacionesApi = response.data || response.postulaciones || [];
        console.log('[PostulacionesService] Datos recibidos de getPostulaciones:', postulacionesApi);
        return postulacionesApi.map((p: any) => ({
          idPostulaciones: p.idPostulaciones,
          fechaPostulacion: p.fechaPostulacion,
          estado: this.mapEstadoFromBackend(p.estado),
          vacantesId: p.vacantesId,
          
        }));
      })
    );
  }

  /**
   *
   * @param vacantesId 
   * @returns 
   */
  searchPostulacionesByVacantesId(vacantesId: number): Observable<Postulacion[]> {
    const url = `${this.searchApiUrl}/${vacantesId}`;
    console.log(`[PostulacionesService] Llamando a GET ${url}`);
    return this.http.get<any>(url).pipe(
      map(response => {
        const resultadosApi = response.results || response.data || [];
        console.log('[PostulacionesService] Datos recibidos de searchPostulacionesByVacantesId:', resultadosApi);
        return resultadosApi.map((p: any) => ({
          idPostulaciones: p.idPostulaciones,
          fechaPostulacion: p.fechaPostulacion,
          estado: this.mapEstadoFromBackend(p.estado),
          vacantesId: p.vacantesId,
          
        }));
      })
    );
  }

  /**
   * 
   * @param postulacionId 
   * @param newStatus 
   * @returns 
   */
  updatePostulacionStatus(postulacionId: number, newStatus: Postulacion['estado']): Observable<Postulacion> {
    console.log(`[PostulacionesService] Llamando a PUT/PATCH para actualizar estado de postulación ${postulacionId} a ${newStatus}`);
    const estadoBackend = this.mapEstadoToBackend(newStatus);
    
    const updateUrl = `${this.apiUrl}/${postulacionId}/status`; 
    return this.http.put<any>(updateUrl, { estado: estadoBackend }).pipe( // O .patch<any>(...)
      map(response => {
        
        const updatedPostulacionApi = response.postulacion || response.data;
        console.log('[PostulacionesService] Datos recibidos de updatePostulacionStatus:', updatedPostulacionApi);
        if (!updatedPostulacionApi) throw new Error('Respuesta inválida de la API de actualización de estado');
        return {
          idPostulaciones: updatedPostulacionApi.idPostulaciones,
          fechaPostulacion: updatedPostulacionApi.fechaPostulacion,
          estado: this.mapEstadoFromBackend(updatedPostulacionApi.estado),
          vacantesId: updatedPostulacionApi.vacantesId,
          
        };
      })
    );
  }

  /**
  .
   * @param postulacionData 
   * @returns 
   */
   crearPostulacion(postulacionData: { vacantesId: number }): Observable<Postulacion> {
     console.log(`[PostulacionesService] Llamando a POST ${this.apiUrl} con datos:`, postulacionData);
     
     return this.http.post<Postulacion>(this.apiUrl, postulacionData).pipe(
       map(response => {
          
          return response; 
       })
       
     );
   }


  private mapEstadoFromBackend(backendEstado: number): Postulacion['estado'] {
    switch (backendEstado) {
      case 1: return 'Aceptado';
      case 2: return 'Rechazado';
      case 0:
      default: return 'Pendiente';
    }
  }

  private mapEstadoToBackend(frontendEstado: Postulacion['estado']): number {
    switch (frontendEstado) {
      case 'Aceptado': return 1;
      case 'Rechazado': return 2;
      case 'Pendiente':
      default: return 0;
    }
  }

}