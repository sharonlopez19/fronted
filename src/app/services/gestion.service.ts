// src/app/services/gestion.service.ts
// --> Asegúrate de que este archivo está en esta ruta o similar <--

import { Injectable } from '@angular/core'; // @Injectable para servicios
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Para peticiones HTTP y manejo de errores
import { Observable, throwError } from 'rxjs'; // Para manejar resultados asíncronos y errores observables
import { catchError, tap } from 'rxjs/operators'; // Operadores de RxJS (tap para depurar, catchError para manejar errores)

// === INTERFAZ VACANTE ===
// Define la estructura de los datos de una Vacante EXACTAMENTE como en tu base de datos (según la imagen)
// y cómo esperas recibirlos/enviarlos desde/hacia tu API.
// *** Usa ? si una propiedad puede ser null o undefined según tu API ***
export interface Vacante {
  idVacantes?: number; // int(11) de la DB -> number en TS. Es la PK, opcional al crear.
  nomVacante: string; // varchar(30) -> string en TS. Nombre de la vacante.
  descripVacante?: string; // text -> string en TS. Descripción. Marcar opcional si puede ser NULL en DB/API.
  salario?: number; // float -> number en TS. Salario. Marcar opcional si puede ser NULL en DB/API.
  expMinima?: string; // varchar(45) -> string en TS. Experiencia mínima. Marcar opcional.
  cargoVacante?: string; // varchar(45) -> string en TS. Cargo. Marcar opcional.
  catVacId?: number; // int(11) -> number en TS. ID de Categoría. Marcar opcional si puede ser NULL en DB/API.
  // *** Si tu API maneja otras propiedades que no están en esta lista de columnas principales, añádelas aquí ***
}

// === SERVICIO VacanteService ===
// Clase que maneja la comunicación con la API de vacantes en http://localhost:8080/api/gestion.
@Injectable({
  providedIn: 'root' // Hace el servicio inyectable en toda la app
})
export class VacanteService { // <-- EL NOMBRE DE LA CLASE DEL SERVICIO

  // *** URL BASE DE TU API PARA ESTE RECURSO ***
  // Ya la has actualizado a http://localhost:8080/api/gestion
  private apiUrl = 'http://localhost:8000/api/vacantes'; // <-- Tu URL ya actualizada

  constructor(private http: HttpClient) { }

  // --- Métodos CRUD (Comunicación con API) ---

  // Método para obtener TODAS las vacantes
  getVacantes(): Observable<Vacante[]> {
    // Hace una petición GET a la URL base. Espera un array de objetos Vacante con la estructura definida arriba.
    return this.http.get<Vacante[]>(this.apiUrl).pipe(
      // tap(data => console.log('Datos de vacantes recibidos:', data)), // Descomenta para depurar
      catchError(this.handleError) // Manejo básico de errores HTTP
    );
  }

  // Método para crear una NUEVA vacante
  // Recibe un objeto Vacante (que NO debe tener idVacantes si la API lo autogenera)
  createVacante(vacante: Vacante): Observable<Vacante> {
    // Crea una copia del objeto sin el campo idVacantes para no enviarlo si la API lo genera.
    const { idVacantes, ...vacanteToCreate } = vacante;
    // Hace una petición POST a la URL base con los datos de la nueva vacante.
    // Espera el objeto Vacante creado (probablemente con su nuevo ID) de vuelta.
    return this.http.post<Vacante>(this.apiUrl, vacanteToCreate).pipe(
      // tap(newVacante => console.log('Vacante creada:', newVacante)), // Descomenta para depurar
      catchError(this.handleError) // Manejo básico de errores HTTP
    );
  }

  // Método para ACTUALIZAR una vacante existente
  // Recibe un objeto Vacante COMPLETO (que DEBE incluir idVacantes)
  updateVacante(vacante: Vacante): Observable<Vacante> {
     // Verifica que la vacante tenga un ID usando 'idVacantes' antes de intentar actualizar
     if (vacante.idVacantes === undefined || vacante.idVacantes === null) {
         console.error('Error: Intento de actualizar vacante sin idVacantes.');
         return throwError(() => new Error('No se puede actualizar una vacante sin ID (idVacantes).'));
     }
     // Hace una petición PUT al endpoint incluyendo el ID en la URL.
     // Envía el objeto Vacante completo en el cuerpo de la petición.
     // Espera el objeto Vacante actualizado de vuelta.
     // Usa template literals (backticks ``) para incluir el ID en la URL
     return this.http.put<Vacante>(`${this.apiUrl}/${vacante.idVacantes}`, vacante).pipe(
       // tap(() => console.log(`Vacante actualizada: ${vacante.idVacantes}`)), // Descomenta para depurar
       catchError(this.handleError) // Manejo básico de errores HTTP
     );
  }

  // Método para ELIMINAR una vacante por su ID
  // Recibe el ID de la vacante a eliminar. El tipo DEBE coincidir con el tipo de idVacantes.
  deleteVacante(id: number): Observable<void> { // <--- Tipo ajustado a 'number' basado en int(11)
    // Hace una petición DELETE al endpoint incluyendo el ID en la URL.
    // Espera una respuesta vacía o un indicador de éxito (generalmente Observable<void>).
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      // tap(() => console.log(`Vacante eliminada: ${id}`)), // Descomenta para depurar
      catchError(this.handleError) // Manejo básico de errores HTTP
    );
  }

  // --- Puedes añadir otros métodos si los necesitas ---
  // // Ejemplo: Método para obtener una ÚNICA vacante por ID
  // getVacante(id: number): Observable<Vacante> { // Usa el tipo 'number'
  //   return this.http.get<Vacante>(`${this.apiUrl}/${id}`).pipe(
  //     tap(data => console.log(`Vacante ${id} recibida:`, data)), // Descomenta para depurar
  //     catchError(this.handleError) // Manejo básico de errores HTTP
  //   );
  // }

  // --- Función genérica para manejar errores HTTP ---
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend retornó un código de respuesta fallido.
      // El cuerpo de la respuesta puede contener pistas sobre qué salió mal.
      errorMessage = `Código de error del servidor: ${error.status}, `;
       // Intenta obtener el mensaje del backend si existe
       errorMessage += error.error?.message || error.statusText;
       console.error('Detalles del error del backend:', error.error);
    }
    console.error('Error en el servicio:', errorMessage);
    // Devuelve un observable con un mensaje de error amigable para el componente.
    return throwError(() => new Error(errorMessage));
  }
}