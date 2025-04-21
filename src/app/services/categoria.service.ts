import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// === NO IMPORTAMOS 'environment' YA QUE NO LO USAS ===
// import { environment } from 'src/environments/environment';

// === DEFINICIÓN DE LA INTERFAZ CATEGORIA ===
// Esta interfaz coincide con los nombres de las columnas en tu tabla de base de datos.
export interface Categoria {
  idCatVac?: number; // Clave primaria: idCatVac (puede ser opcional al crear)
  nomCategoria: string; // Nombre de la categoría: nomCategoria
  // Añade aquí cualquier otra propiedad si tu tabla tiene más columnas relevantes
}

// === DEFINICIÓN DEL SERVICIO ===
@Injectable({
  providedIn: 'root' // Esto registra el servicio en el inyector raíz
})
export class CategoriaService {

  // === URL HARDCODEADA ===
  // Usamos la URL completa del endpoint de categorías de vacantes directamente.
  // **ASEGÚRATE de que esta URL sea exactamente la correcta para tu API de Laravel.**
  private categoriasEndpointUrl = 'http://localhost:8000/api/categoriavacantes';


  // Inyectamos el HttpClient para hacer las peticiones HTTP
  constructor(private http: HttpClient) { }

  // --- MÉTODOS PARA INTERACTUAR CON LA API ---

  // Método para obtener todas las categorías.
  // Realiza una petición GET a la URL hardcodeada.
  // Usa pipe(map) para extraer el array de categorías de la respuesta anidada.
  getCategorias(): Observable<Categoria[]> {
    console.log(`[CategoriaService] Fetching categories from: ${this.categoriasEndpointUrl}`);
    return this.http.get<any>(this.categoriasEndpointUrl).pipe(
      map(res => {
        console.log('[CategoriaService] API Response (GET List):', res);
        // === AJUSTA ESTA LÍNEA SI ES NECESARIO ===
        // Cambia 'res.categoriavacantes' si el array de categorías viene anidado bajo otra clave en la respuesta de tu backend Laravel.
        // Si tu backend devuelve { "categorias": [...] }, usa 'res.categorias'.
        if (res && Array.isArray(res.categoriavacantes)) {
          return res.categoriavacantes as Categoria[];
        } else {
           console.error('[CategoriaService] Unexpected API response format for GET categories:', res);
           throw new Error('Invalid API response format: Expected an array under "categoriavacantes".');
        }
      }),
      catchError(error => {
         console.error('[CategoriaService] Error fetching categories:', error);
         return throwError(() => new Error('Failed to fetch categories. Please try again later.'));
      })
    );
  }

  // Método para obtener una categoría específica por su ID (idCatVac).
  // Realiza una petición GET a la URL hardcodeada + /{idCatVac}.
  getCategoria(idCatVac: number): Observable<Categoria> {
     const url = `${this.categoriasEndpointUrl}/${idCatVac}`;
     console.log(`[CategoriaService] Fetching category with idCatVac: ${idCatVac} from: ${url}`);
     return this.http.get<any>(url).pipe(
        map(res => {
             console.log(`[CategoriaService] API Response (GET id ${idCatVac}):`, res);
             // === AJUSTA ESTA LÍNEA SI ES NECESARIO ===
             // Si tu API anida el objeto de la categoría individual (ej: { "categoria": { ... } }), ajústalo.
             return res as Categoria; // Asumiendo que devuelve directamente el objeto Categoria.
        }),
         catchError(error => {
             console.error(`[CategoriaService] Error fetching category id ${idCatVac}:`, error);
             return throwError(() => new Error(`Failed to fetch category ${idCatVac}.`));
         })
     );
  }

  // Método para crear una nueva categoría.
  // Realiza una petición POST a la URL hardcodeada.
  createCategoria(categoria: Categoria): Observable<Categoria> {
     console.log('[CategoriaService] Creating category:', categoria);
     const dataToSend = { nomCategoria: categoria.nomCategoria }; // Envía solo el nombre
     return this.http.post<any>(this.categoriasEndpointUrl, dataToSend).pipe(
         map(res => {
             console.log('[CategoriaService] API Response (POST):', res);
              // === AJUSTA ESTA LÍNEA SI ES NECESARIO ===
             // Si tu API devuelve la categoría creada con su nuevo ID anidada o no, ajústalo.
             return res as Categoria; // Asumiendo que devuelve la categoría creada o un objeto similar.
         }),
          catchError(error => {
              console.error('[CategoriaService] Error creating category:', error);
              let errorMessage = 'Failed to create category.';
               if (error.error && error.error.message) {
                   errorMessage = error.error.message;
               } else if (error.error && error.error.errors) {
                    errorMessage += ' Validation failed: ' + JSON.stringify(error.error.errors);
               }
              return throwError(() => new Error(errorMessage));
          })
     );
  }

  // Método para actualizar una categoría existente.
  // Realiza una petición PUT (o PATCH) a la URL hardcodeada + /{idCatVac}.
  updateCategoria(categoria: Categoria): Observable<Categoria> {
    if (categoria.idCatVac === undefined) {
      const errorMsg = 'Cannot update category without idCatVac';
      console.error(`[CategoriaService] ${errorMsg}`);
      return throwError(() => new Error(errorMsg));
    }
    const url = `${this.categoriasEndpointUrl}/${categoria.idCatVac}`;
    console.log(`[CategoriaService] Updating category with idCatVac: ${categoria.idCatVac}`, categoria);
    const dataToSend = { nomCategoria: categoria.nomCategoria }; // Envía solo el nombre
    return this.http.put<any>(url, dataToSend).pipe( // O this.http.patch<any>(url, dataToSend).pipe( si usas PATCH
         map(res => {
             console.log('[CategoriaService] API Response (PUT):', res);
              // === AJUSTA ESTA LÍNEA SI ES NECESARIO ===
             // Si tu API devuelve la categoría actualizada anidada o no, ajústalo.
             return res as Categoria; // Asumiendo que devuelve la categoría actualizada.
         }),
         catchError(error => {
             console.error(`[CategoriaService] Error updating category id ${categoria.idCatVac}:`, error);
              let errorMessage = `Failed to update category ${categoria.idCatVac}.`;
              if (error.error && error.error.message) {
                  errorMessage = error.error.message;
              } else if (error.error && error.error.errors) {
                   errorMessage += ' Validation failed: ' + JSON.stringify(error.error.errors);
              }
             return throwError(() => new Error(errorMessage));
         })
    );
  }

  // Método para eliminar una categoría por su ID (idCatVac).
  // Realiza una petición DELETE a la URL hardcodeada + /{idCatVac}.
  deleteCategoria(idCatVac: number): Observable<void> {
    const url = `${this.categoriasEndpointUrl}/${idCatVac}`;
    console.log(`[CategoriaService] Deleting category with idCatVac: ${idCatVac} from: ${url}`);
    return this.http.delete<void>(url).pipe(
         catchError(error => {
             console.error(`[CategoriaService] Error deleting category id ${idCatVac}:`, error);
              let errorMessage = `Failed to delete category ${idCatVac}.`;
              if (error.error && error.error.message) {
                  errorMessage = error.error.message;
              }
             return throwError(() => new Error(errorMessage));
         })
    );
  }

  // NOTAS IMPORTANTES:
  // 1. La URL 'http://localhost:8000/api/categoriavacantes' está hardcodeada.
  // 2. Verifica las claves de anidación en los métodos 'map' (ej. 'res.categoriavacantes')
  //    para que coincidan exactamente con la estructura JSON que tu backend Laravel devuelve.
  // 3. Confirma que tus rutas de Laravel para '/categoriavacantes' manejan los métodos HTTP (GET, POST, PUT/PATCH, DELETE) correctamente.
}