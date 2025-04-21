import { Component, OnInit, OnDestroy } from '@angular/core'; // Importar OnDestroy para limpiar suscripción
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Postulacion, PostulacionesService } from '../../../services/postulaciones.service';
import { AuthService } from '../../../services/auth.service';
import { MenuComponent } from '../../menu/menu.component';
import { Subject, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs';
import { of, Subscription } from 'rxjs';




@Component({
  selector: 'app-postulaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
  
  ],
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit, OnDestroy { // Implementar OnDestroy

  postulaciones: Postulacion[] = [];
  filtroNombre: string = ""; // Campo para el ID de Vacante a buscar (valor del input)
  usuario: any = {};
  postulacionSeleccionada: Postulacion | null = null;

  // === Sujeto RxJS para manejar los cambios en el input de búsqueda ===
  // Emite el valor actual del campo de búsqueda cada vez que cambia.
  private searchTerms = new Subject<string>();

  // === Suscripción para gestionar el observable de búsqueda ===
  // Necesario para poder desuscribirse al destruir el componente y evitar fugas de memoria.
  private searchSubscription: Subscription | undefined;


  constructor(
    public authService: AuthService,
    // === Inyectar el servicio de postulaciones ===
    // Este servicio es el que se encargará de hacer las llamadas HTTP a tu backend.
    private postulacionesService: PostulacionesService
  ) { }

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
    }

    // === Configurar el flujo de búsqueda con RxJS ===
    // Creamos un pipeline de operadores RxJS que procesará los valores emitidos por searchTerms.
    this.searchSubscription = this.searchTerms.pipe(
      // Esperar 300ms después de la última emisión antes de dejar pasar el valor.
      // Esto evita hacer una petición API por cada tecla que se presiona rápidamente.
      debounceTime(300),

      // Ignorar el término si es el mismo que el último término procesado.
      distinctUntilChanged(),

      // switchMap cancela la petición anterior si llega un nuevo término antes de que la anterior complete.
      // Luego, llama a la API con el nuevo término.
      switchMap((term: string) => {
        // === Lógica para decidir si cargar todo o buscar por ID ===

        // Verificamos si el término está vacío, nulo o si no es un número válido (para buscar por ID).
        if (!term || term.trim() === '' || isNaN(+term)) {
           // Si el término está vacío o no es un número válido, cargamos todas las postulaciones.
           console.log('Disparando carga completa de postulaciones (término vacío/inválido)...');
           // Llama al método del servicio para obtener todas las postulaciones.
           return this.postulacionesService.getPostulaciones().pipe(
             // Capturamos cualquier error de la petición API para mostrar un mensaje y devolver un array vacío.
             catchError(error => {
               console.error('Error al cargar todas las postulaciones:', error);
               Swal.fire('Error', 'No se pudieron cargar las postulaciones.', 'error');
               return of([]); // Devuelve un Observable que emite un array vacío []
             })
           );
        } else {
           // Si el término es un número válido, lo usamos como ID de Vacante para buscar.
           const vacanteId = +term; // Convertir el término (string) a número.
           console.log(`Disparando búsqueda por Vacante ID: ${vacanteId}...`);
           // === Llama al servicio con el ID de vacante ===
           return this.postulacionesService.searchPostulacionesByVacantesId(vacanteId).pipe(
             // Capturamos cualquier error de la petición API para mostrar un mensaje y devolver un array vacío.
             catchError(error => {
               console.error(`Error al buscar postulaciones para Vacante ID ${vacanteId}:`, error);
               Swal.fire('Error', `Error al buscar postulaciones para Vacante ID ${vacanteId}.`, 'error');
               return of([]); // Devuelve un Observable que emite un array vacío []
             })
           );
        }
      })
    )
    .subscribe({
      // El método 'next' del subscribe se ejecuta cada vez que el switchMap emite un nuevo array de resultados (ya sean todos o los de la búsqueda).
      next: (results: Postulacion[]) => {
        // === Actualizar la lista 'postulaciones' con los resultados recibidos ===
        // Esto refresca la tabla en la interfaz de usuario.
        this.postulaciones = results;
        console.log('Lista de postulaciones actualizada con resultados:', results);
      },
      // El método 'error' del subscribe solo se ejecutaría si el flujo RxJS en sí mismo falla de forma inesperada,
      // no si una petición HTTP dentro del switchMap falla (gracias a catchError dentro).
      error: (error) => {
        console.error('Error fatal en la suscripción de búsqueda RxJS:', error); // Raramente se llega aquí con catchError
      }
    });

    // === Carga Inicial al abrir la página ===
    // Emitimos un término de búsqueda vacío ("") en searchTerms para que el flujo RxJS
    // en ngOnInit detecte que el término está vacío y dispare la carga completa inicial
    // a través de this.postulacionesService.getPostulaciones().
    this.cargarPostulaciones();
  }

  ngOnDestroy(): void {
      // === Limpieza crucial para evitar fugas de memoria ===
      // Al destruir el componente, debemos desuscribirnos del observable de búsqueda
      // para que no intente actualizar el componente después de que ya no existe.
      if (this.searchSubscription) {
          this.searchSubscription.unsubscribe();
      }
  }

  /**
   * Método llamado por el evento 'input' en el campo de búsqueda del HTML.
   * Captura el valor actual del campo y lo emite en el Sujeto searchTerms.
   * @param event El evento de entrada del campo de texto.
   */
  onSearchInput(event: any): void {
    // Obtenemos el valor actual del campo de entrada (asumimos que es un input HTML)
    const searchTerm = (event.target as HTMLInputElement).value;
    // Emitimos este valor en el Sujeto searchTerms. Esto activará el pipeline RxJS en ngOnInit.
    this.searchTerms.next(searchTerm);
  }


  /**
   * Método llamado en ngOnInit para iniciar la carga de datos.
   * Su nueva función es simplemente disparar la lógica de búsqueda/carga inicial
   * emitiendo un término vacío en searchTerms.
   * Hemos removido los datos manuales de aquí.
   */
  private cargarPostulaciones(): void {
      console.log('Iniciando el proceso de carga/búsqueda inicial...');
      // Emitimos una cadena vacía en searchTerms. El pipeline RxJS en ngOnInit
      // detectará que el término está vacío y llamará a getPostulaciones().
      this.searchTerms.next('');
  }


  /**
   * Prepara los datos de la postulación seleccionada para editar el estado en un modal.
   * @param postulacion La postulación seleccionada (objeto Postulacion).
   * @param index El índice de la postulación en la lista actual (mantenido por compatibilidad con HTML, pero no estrictamente necesario para guardar).
   */
  editarPostulacion(postulacion: Postulacion, index: number): void {
     // Creamos una copia superficial de la postulación para el formulario del modal.
     // Esto evita que los cambios en el modal afecten la lista original antes de guardar.
     this.postulacionSeleccionada = { ...postulacion };
     console.log('Preparando para editar estado de postulación:', postulacion);
     // La apertura del modal ('#editarEstadoModal') se controla directamente en el HTML usando data-bs-toggle.
  }

  /**
   * Establece la postulación seleccionada para mostrar sus detalles en un modal.
   * @param postulacion La postulación seleccionada (objeto Postulacion).
   */
  verDetalles(postulacion: Postulacion): void {
      // Podrías llamar a un servicio para obtener detalles frescos de la API si es necesario,
      // usando el ID de la postulación (postulacion.idPostulaciones).
      // Por ahora, simplemente usamos el objeto Postulacion tal como está en la lista actual.
      this.postulacionSeleccionada = postulacion;
      console.log('Mostrando detalles de postulación:', postulacion);
      // La apertura del modal ('#verDetallesModal') se controla directamente en el HTML.
  }

  /**
   * Guarda el estado modificado de la postulación.
   * **Esta función DEBE ser modificada para llamar a un método en PostulacionesService**
   * que envíe la actualización del estado (y el ID) a tu backend de Laravel.
   */
  guardarEstadoPostulacion(): void {
    // Verificamos que haya una postulación seleccionada y que tenga un ID válido (la clave primaria de la BD).
    // Usamos 'idPostulaciones' según la interfaz y la BD.
    if (!this.postulacionSeleccionada || this.postulacionSeleccionada.idPostulaciones === undefined) {
      Swal.fire('Error', 'No se ha seleccionado una postulación válida para actualizar.', 'error');
      return;
    }

    const selectedPostulacion = this.postulacionSeleccionada;

    // === TODO: Implementar la llamada al servicio para actualizar el estado vía API ===
    console.log('Intentando guardar estado de postulación (llamada API pendiente):', selectedPostulacion);

    // === EJEMPLO DE CÓMO SE LLAMARÍA AL MÉTODO DEL SERVICIO ===
    // Debes implementar el método 'updatePostulacionStatus' en PostulacionesService.
    // Este método debe hacer la llamada HTTP (PUT/PATCH) a tu backend,
    // enviando selectedPostulacion.idPostulaciones y selectedPostulacion.estado.
    // El servicio también debe encargarse de mapear el estado string ('Aceptado') a tinyint (ej. 1) para la BD.
    // this.postulacionesService.updatePostulacionStatus(selectedPostulacion.idPostulaciones, selectedPostulacion.estado).pipe(
    //     // Manejo de errores para la petición API de actualización
    //     catchError(error => {
    //         console.error('Error al actualizar estado de postulación en API:', error);
    //         Swal.fire('Error', 'No se pudo guardar el estado de la postulación.', 'error');
    //         // Es importante retornar un error aquí para que el subscribe().error se ejecute,
    //         // o devolver un Observable que emita un error. throwError(() => new Error(...)) es común.
    //         return throwError(() => new Error(error.message || 'Error desconocido al actualizar estado'));
    //     })
    // ).subscribe({
    //     // Bloque 'next' se ejecuta si la API responde con éxito (código 2xx).
    //     next: (updatedPostulacion) => { // Asumiendo que la API devuelve la postulación actualizada
    //         console.log('Estado de postulación actualizado con éxito en API:', updatedPostulacion);
    //         Swal.fire('¡Actualizado!', 'Estado de postulación guardado correctamente.', 'success');

    //         // Opcional: Si la API devuelve la postulación actualizada, puedes reemplazarla en tu lista local.
    //         // Buscar el índice usando el ID de la clave primaria de la BD.
    //         const index = this.postulaciones.findIndex(p => p.idPostulaciones === updatedPostulacion.idPostulaciones);
    //         if (index !== -1) {
    //             this.postulaciones[index] = updatedPostulacion;
    //         }

    //         // Cerrar el modal o limpiar la selección después de guardar con éxito.
    //         this.postulacionSeleccionada = null;
    //     },
    //     // Bloque 'error' se ejecuta si la petición API falla (código 4xx, 5xx),
    //     // gracias al catchError que re-lanza el error o devuelve un Observable de error.
    //     error: (error) => {
    //         // El manejo de errores con Swal ya está en el catchError del pipe.
    //         console.error('Suscripción de updatePostulacionStatus completada con error.', error);
    //     }
    // });


    // --- Código anterior (simulado) que se debe eliminar una vez que la llamada a la API funcione ---
    // Buscar el índice usando el ID de la BD.
    // const index = this.postulaciones.findIndex(p => p.idPostulaciones === selectedPostulacion.idPostulaciones);
    // if (index !== -1) {
    //   this.postulaciones[index].estado = selectedPostulacion.estado; // Actualiza directamente en la lista local (SIMULADO)
    // }
    Swal.fire('¡Actualizado!', 'Estado de postulación guardado correctamente (simulado). **Implementar llamada a la API**).', 'success'); // Mantener mensaje simulado
    this.postulacionSeleccionada = null; // Limpiar la selección después de la acción simulada.
    // --- Fin Código anterior ---
  }

   /**
    * Método placeholder para eliminar una postulación.
    * Si decides añadir un botón de eliminar en el HTML, este método se llamará.
    * DEBE llamar a un método en PostulacionesService para eliminar la postulación vía API.
    * @param postulacion El objeto Postulacion a eliminar. Es mejor pasar el objeto completo.
    */
   confirmDeletePostulacion(postulacion: Postulacion): void { // Recibir el objeto Postulacion como parámetro
     console.warn("confirmDeletePostulacion: Este método no se llama desde el HTML actual con un botón visible. Si añades eliminar, implementa la llamada al servicio API aquí.");

     // === EJEMPLO DE CÓMO SE LLAMARÍA AL MÉTODO DEL SERVICIO ===
     // Si añades un botón de eliminar en el HTML (ej. <button (click)="confirmDeletePostulacion(postulacion)">)
     // y necesitas confirmación SweetAlert antes de llamar a la API:
     // if (postulacion.idPostulaciones !== undefined) { // Verificar que la postulación tiene un ID de BD
     //   Swal.fire({
     //      title: `¿Eliminar postulación ${postulacion.idPostulaciones}?`, // Mensaje de confirmación
     //      text: 'Esta acción no se puede deshacer.',
     //      icon: 'warning',
     //      showCancelButton: true,
     //      confirmButtonText: 'Sí, eliminar',
     //      cancelButtonText: 'Cancelar'
     //   }).then((result) => {
     //      if (result.isConfirmed) { // Si el usuario confirma en SweetAlert
     //          // Llamar al servicio para eliminar vía API
     //          this.postulacionesService.deletePostulacion(postulacion.idPostulaciones).pipe(
     //              catchError(error => {
     //                  console.error('Error al eliminar postulación en API:', error);
     //                  Swal.fire('Error', 'No se pudo eliminar la postulación.', 'error');
     //                  return throwError(() => new Error(error.message || 'Error desconocido al eliminar postulación'));
     //              })
     //          ).subscribe({
     //              next: () => {
     //                  // Éxito: Mostrar mensaje y remover de la lista local
     //                  Swal.fire('¡Eliminada!', 'La postulación fue eliminada correctamente.', 'success');
     //                  // Remover la postulación eliminada de la lista mostrada en la tabla
     //                  this.postulaciones = this.postulaciones.filter(p => p.idPostulaciones !== postulacion.idPostulaciones);
     //              },
     //              error: (error) => {
     //                  // El manejo de errores con Swal ya está en el catchError del pipe.
     //                  console.error('Suscripción de deletePostulacion completada con error.', error);
     //              }
     //          });
     //      }
     //   });
     // } else {
     //    console.error('No se puede eliminar una postulación sin ID.');
     //    Swal.fire('Error', 'Datos de postulación inválidos para eliminar.', 'error');
     // }
   }
}