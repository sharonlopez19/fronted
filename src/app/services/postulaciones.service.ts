import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Definimos la interfaz Postulacion aquí
export interface Postulacion {
  idPostulaciones?: number; // Coincide con la clave primaria de la BD
  fechaPostulacion: string; // Coincide con la columna de la BD (asumimos string en FE)
  estado: 'Aceptado' | 'Rechazado' | 'Pendiente'; // Representación en frontend (string)
  vacantesId: number; // Coincide con la columna de la BD (plural 'vacantesId')
  // Añade aquí otras propiedades que la API te devuelva
}

@Injectable({
  providedIn: 'root'
})
export class PostulacionesService {

  // === URL BASE DE TU API EN LARAVEL ===
  // Ajusta estas URLs a las REALES de tus endpoints de backend.
  private apiUrl = 'http://localhost:8000/api/postulaciones'; // Endpoint principal (ej. para GET all, PUT/DELETE by ID)
  private searchApiUrl = 'http://localhost:8000/api/postulaciones/search'; // Endpoint para buscar por vacantesId (lo crearemos)

  constructor(private http: HttpClient) { } // Inyectamos HttpClient

  /**
   * Obtiene la lista completa de postulaciones desde la API.
   * Se usará para la carga inicial o cuando el campo de búsqueda está vacío/inválido.
   * @returns Un Observable con el array de postulaciones.
   */
  // === => VERIFICA QUE ESTE MÉTODO EXISTA Y NO ESTÉ COMENTADO EN TU ARCHIVO <=== ===
  getPostulaciones(): Observable<Postulacion[]> {
    console.log(`[PostulacionesService] Llamando a GET ${this.apiUrl}`);
    // Realiza una petición GET a tu endpoint de listado
    // Ajusta el '.pipe(map(...))' según la estructura real de respuesta de tu API
    // Ejemplo: Si tu API devuelve { "data": [...] } o { "postulaciones": [...] }
    return this.http.get<any>(this.apiUrl).pipe(
       // Extrae el array de la clave correcta (data o postulaciones, etc.)
       map(response => {
           const postulacionesApi = response.data || response.postulaciones || []; // Ajusta clave si es necesario
           console.log('[PostulacionesService] Datos recibidos de getPostulaciones:', postulacionesApi);
           // Mapea los objetos recibidos si el nombre de los campos o tipos difieren del frontend
           return postulacionesApi.map((p: any) => ({
             idPostulaciones: p.idPostulaciones, // Mapea el ID
             fechaPostulacion: p.fechaPostulacion, // Mapea la fecha
             estado: this.mapEstadoFromBackend(p.estado), // Mapea el estado (tinyint a string)
             vacantesId: p.vacantesId, // Mapea el vacantesId
             // Mapear otras propiedades si existen
           }));
       })
    );
  }

  /**
   * Busca postulaciones por el ID de la vacante asociada.
   * @param vacantesId El ID de la vacante a buscar.
   * @returns Un Observable con el array de postulaciones encontradas.
   */
  searchPostulacionesByVacantesId(vacantesId: number): Observable<Postulacion[]> {
     console.log(`[PostulacionesService] Llamando a GET ${this.searchApiUrl} con vacantesId=${vacantesId}`);
     // Realiza una petición GET al endpoint de búsqueda con el parámetro 'vacantesId'
     // Ajusta el endpoint (this.searchApiUrl) y el nombre del parámetro ('vacantesId') si tu backend usa otros nombres
     return this.http.get<any>(this.searchApiUrl, { params: { vacantesId: vacantesId.toString() } }).pipe(
        // Ajusta el mapeo de respuesta igual que en getPostulaciones
        map(response => {
            const resultadosApi = response.results || response.data || []; // Extrae el array
            console.log('[PostulacionesService] Datos recibidos de searchPostulacionesByVacantesId:', resultadosApi);
            return resultadosApi.map((p: any) => ({
              idPostulaciones: p.idPostulaciones,
              fechaPostulacion: p.fechaPostulacion,
              estado: this.mapEstadoFromBackend(p.estado),
              vacantesId: p.vacantesId,
              // Mapear otras propiedades
            }));
        })
     );
  }

  /**
   * Actualiza el estado de una postulación a través de la API.
   * @param postulacionId El ID de la postulación a actualizar.
   * @param newStatus El nuevo estado (string del frontend).
   * @returns Un Observable con la postulación actualizada.
   */
   updatePostulacionStatus(postulacionId: number, newStatus: Postulacion['estado']): Observable<Postulacion> {
     console.log(`[PostulacionesService] Llamando a PUT/PATCH para actualizar estado de postulación ${postulacionId} a ${newStatus}`);
     // Mapeo del estado string de frontend a tinyint de backend
     const estadoBackend = this.mapEstadoToBackend(newStatus); // Usa el helper para obtener el valor numérico

     // Realiza la petición PUT o PATCH para actualizar el estado
     // Ajusta el método (put/patch), la URL y la estructura del body según tu API
     // Ejemplo: PUT a /api/postulaciones/{id}/status enviando {"estado": valorNumerico}
     const updateUrl = `${this.apiUrl}/${postulacionId}/status`; // URL de ejemplo para actualizar solo estado
     return this.http.put<any>(updateUrl, { estado: estadoBackend }).pipe(
       // Mapeo de respuesta al actualizar (asume que la API devuelve el objeto actualizado)
       map(response => {
           const updatedPostulacionApi = response.postulacion || response.data; // Obtén el objeto actualizado
           console.log('[PostulacionesService] Datos recibidos de updatePostulacionStatus:', updatedPostulacionApi);
           if (!updatedPostulacionApi) throw new Error('Respuesta inválida de la API de actualización de estado');
           // Mapea el objeto recibido a la interfaz del frontend
           return {
             idPostulaciones: updatedPostulacionApi.idPostulaciones,
             fechaPostulacion: updatedPostulacionApi.fechaPostulacion,
             estado: this.mapEstadoFromBackend(updatedPostulacionApi.estado), // Mapea el estado de vuelta a string
             vacantesId: updatedPostulacionApi.vacantesId,
             // Mapear otras propiedades si existen
           };
       })
     );
   }

   // --- Métodos Helper para mapear el estado entre frontend (string) y backend (tinyint) ---
   // === DEBES AJUSTAR LA LÓGICA EN ESTOS MÉTODOS PARA QUE COINCIDA CON LOS VALORES DE TU BD (0, 1, 2...) ===

   /**
    * Mapea el valor del estado desde el backend (tinyint) al string del frontend.
    * Ejemplo: 0=Pendiente, 1=Aceptado, 2=Rechazado
    * @param backendEstado El valor del estado desde el backend (generalmente number/tinyint).
    * @returns El string de estado correspondiente ('Pendiente', 'Aceptado', 'Rechazado').
    */
   private mapEstadoFromBackend(backendEstado: number): Postulacion['estado'] {
       // === TODO: IMPLEMENTAR LÓGICA REAL SEGÚN TUS VALORES DE BD ===
       switch (backendEstado) {
           case 1: return 'Aceptado'; // Ejemplo: Si 1 en BD es Aceptado
           case 2: return 'Rechazado'; // Ejemplo: Si 2 en BD es Rechazado
           case 0: // Ejemplo: Si 0 en BD es Pendiente
           default: return 'Pendiente'; // Valor por defecto
       }
   }

   /**
    * Mapea el valor del estado desde el frontend (string) al tinyint del backend.
    * Ejemplo: 'Pendiente'=0, 'Aceptado'=1, 'Rechazado'=2
    * @param frontendEstado El string de estado desde el frontend ('Pendiente', 'Aceptado', 'Rechazado').
    * @returns El valor tinyint correspondiente para el backend.
    */
   private mapEstadoToBackend(frontendEstado: Postulacion['estado']): number {
       // === TODO: IMPLEMENTAR LÓGICA REAL SEGÚN TUS VALORES DE BD ===
       switch (frontendEstado) {
           case 'Aceptado': return 1; // Ejemplo: Si 'Aceptado' debe ser 1 en BD
           case 'Rechazado': return 2; // Ejemplo: Si 'Rechazado' debe ser 2 en BD
           case 'Pendiente': // Ejemplo: Si 'Pendiente' debe ser 0 en BD
           default: return 0; // Valor por defecto
       }
   }

   // Puedes añadir aquí otros métodos para DELETE, GET by ID si los necesitas para otras funcionalidades.
   // deletePostulacion(postulacionId: number): Observable<any> { ... }
   // getPostulacionById(postulacionId: number): Observable<Postulacion> { ... }

}