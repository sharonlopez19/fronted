import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ** IMPORTANTE: DEBES CREAR UN SERVICIO PARA POSTULACIONES **
// Asumiendo que tienes un servicio llamado PostulacionesService
// Descomenta la siguiente línea y ajusta la ruta:
// import { PostulacionesService } from '../../../services/postulaciones.service';

// Define una interfaz para Postulacion
interface Postulacion {
  id?: number;
  fechaPostulacion: string; // O tipo Date si manejas fechas como objetos Date
  estado: 'Aceptado' | 'Rechazado' | 'Pendiente'; // Especifica los posibles valores del estado
  vacanteId: number;
  // Añade otras propiedades si tu objeto Postulacion las tiene (ej: applicantId, applicantName)
}

import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
// Importa otros módulos si los necesitas (ej: paginación)
// import { NgxPaginationModule } from 'ngx-pagination';

// Importa MenuComponent si tu componente es standalone y usa <app-menu>
import { MenuComponent } from '../../menu/menu.component';

// ** No usamos el pipe de filtro por ahora **
// import { FilterNombre } from './filter-nombre';


@Component({
  selector: 'app-postulaciones', // Selector para usar este componente en HTML
  standalone: true, // O false si lo declaras en un NgModule
  // Asegúrate de importar CommonModule y FormsModule
  // Si usas paginación, importa NgxPaginationModule
  // Si usas app-menu directamente aquí y no es standalone, impórtalo
  imports: [
    CommonModule,
    FormsModule, // Necesario para [(ngModel)] en el modal de edición
    MenuComponent,
    // NgxPaginationModule, // Descomentar si usas paginación
  ],
  templateUrl: './postulaciones.component.html', // Plantilla HTML que creamos
  styleUrls: ['./postulaciones.component.scss'] // Archivo SCSS que copiamos
})
export class PostulacionesComponent implements OnInit {

  postulaciones: Postulacion[] = []; // Array para almacenar la lista de postulaciones

  // Variable para la barra de búsqueda (sin funcionalidad de filtro aún)
  filtroNombre: string = "";

  usuario: any = {}; // Variable para almacenar el usuario logueado (para verificaciones de rol)

  // ** Añadido para manejar la postulación seleccionada para editar/ver detalles **
  postulacionSeleccionada: Postulacion | null = null;

  // Constructor: inyecta los servicios necesarios
  constructor(
    // ** INYECTA TU SERVICIO DE POSTULACIONES AQUÍ **
    // private postulacionesService: PostulacionesService,
    public authService: AuthService // Inyecta AuthService si necesitas verificar el rol
  ) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Cargar datos del usuario logueado desde localStorage
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('Usuario logueado:', this.usuario);
    }

    // Cargar la lista de postulaciones al iniciar
    this.cargarPostulaciones();
  }

  // Método para cargar las postulaciones desde el servicio
  cargarPostulaciones(): void {
    // ** LLAMA A TU SERVICIO DE POSTULACIONES PARA OBTENER LOS DATOS **
    // Descomenta y ajusta la siguiente parte
    // this.postulacionesService.obtenerPostulaciones().subscribe({
    //   next: (data: Postulacion[]) => { // Asume que el servicio devuelve un array de Postulacion
    //     this.postulaciones = data;
    //     console.log('Postulaciones cargadas:', this.postulaciones);
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar postulaciones', err);
    //     // TODO: Manejar el error, por ejemplo, mostrar un mensaje con Swal.fire
    //      Swal.fire('Error', 'No se pudieron cargar las postulaciones.', 'error');
    //   }
    // });

    // TODO: Elimina o reemplaza esta simulación cuando implementes tu servicio real
    console.log('Simulando carga de postulaciones...');
    this.postulaciones = [
      { id: 1, fechaPostulacion: '2023-10-26', estado: 'Aceptado', vacanteId: 1 },
      { id: 2, fechaPostulacion: '2023-10-25', estado: 'Pendiente', vacanteId: 2 },
      { id: 3, fechaPostulacion: '2023-10-24', estado: 'Rechazado', vacanteId: 1 },
      { id: 4, fechaPostulacion: '2023-10-23', estado: 'Pendiente', vacanteId: 3 },
      { id: 5, fechaPostulacion: '2023-10-22', estado: 'Aceptado', vacanteId: 4 },
      { id: 6, fechaPostulacion: '2023-10-21', estado: 'Rechazado', vacanteId: 2 },
    ];
  }

  // Método para preparar la postulación para editar el estado y abrir el modal
  editarPostulacion(postulacion: Postulacion, index: number): void {
    // Creamos una copia para no modificar el objeto original directamente antes de guardar
    this.postulacionSeleccionada = { ...postulacion };
    console.log('Editando estado de postulación:', postulacion);
    // El modal se abre a través de data-bs-toggle en el HTML (#editarEstadoModal)
  }

   // Método para preparar la postulación para ver detalles y abrir el modal
  verDetalles(postulacion: Postulacion): void {
      // Asignamos la postulación seleccionada para mostrarla en el modal
      this.postulacionSeleccionada = postulacion;
      console.log('Viendo detalles de postulación:', postulacion);
      // El modal se abre a través de data-bs-toggle en el HTML (#verDetallesModal)
  }


  // Método para guardar el estado de la postulación (llamado desde el modal de edición)
  guardarEstadoPostulacion(): void {
    // Validar si hay una postulación seleccionada y tiene ID para actualizar
    if (!this.postulacionSeleccionada || this.postulacionSeleccionada.id === undefined) {
      Swal.fire('Error', 'No se ha seleccionado una postulación válida para actualizar.', 'error');
      return;
    }

    // ** CORREGIDO: Asignamos a una variable local para ayudar a TypeScript con la inferencia de nulidad **
    const selectedPostulacion = this.postulacionSeleccionada;


    console.log('Intentando guardar estado de postulación:', selectedPostulacion); // Usamos la variable local

    // TODO: Llama a tu servicio para actualizar solo el estado de la postulación
    // Esto requeriría un método en tu servicio que pueda actualizar parcialmente la postulación
    // Usa selectedPostulacion.id y selectedPostulacion.estado
    // this.postulacionesService.actualizarEstadoPostulacion(selectedPostulacion.id, selectedPostulacion.estado).subscribe({
    //   next: (res) => {
    //     console.log('Estado de postulación actualizado en backend:', res);
    //     // Actualiza la lista localmente si el backend devuelve el objeto actualizado
    //     const index = this.postulaciones.findIndex(p => p.id === res.id); // Asumiendo que res tiene el ID
    //      if (index !== -1) {
    //         this.postulaciones[index].estado = res.estado; // Solo actualiza el estado en la lista local
    //      }

    //     Swal.fire('¡Actualizado!', 'Estado de postulación guardado correctamente.', 'success');
    //     // TODO: Cierra el modal de edición de estado manualmente si no usas data-bs-dismiss en el botón de submit
    //   },
    //   error: (err) => {
    //     console.error('Error al actualizar estado de postulación:', err);
    //     Swal.fire('Error', 'No se pudo guardar el estado de postulación.', 'error');
    //   }
    // });

    // TODO: Elimina o reemplaza esta simulación cuando implementes tu servicio real
    console.log('Simulando guardado de estado:', selectedPostulacion.estado); // Usamos la variable local
     const index = this.postulaciones.findIndex(p => p.id === selectedPostulacion.id); // Usamos la variable local
     if (index !== -1) {
        this.postulaciones[index].estado = selectedPostulacion.estado; // Actualiza el estado en el array local
     }
    Swal.fire('¡Actualizado!', 'Estado de postulación guardado correctamente (simulado).', 'success');
     // TODO: Cierra el modal de edición de estado si es necesario
     this.postulacionSeleccionada = null; // Limpia la selección
  }


  // Esta función ya no se llama directamente desde el botón con el icono de ojo.
  // Si necesitas lógica de eliminación para postulaciones, deberías añadir otro botón dedicado a eliminar
  // (quizás dentro del modal de detalles o como un botón separado en la vista de tarjeta).
  confirmDeletePostulacion(index: number): void {
       console.warn("La función confirmDeletePostulacion no se llama directamente desde el HTML con el icono de ojo. Si necesitas eliminar, añade un botón de eliminar separado.");
       // Implementa aquí la lógica de eliminación si la necesitas, llamando a tu servicio.
   }


  // TODO: Si necesitas la funcionalidad de filtrado, puedes:
  // 1. Reintroducir un pipe de filtro (ajustado para las propiedades de Postulacion)
  // 2. Implementar la lógica de filtrado directamente en el TS, por ejemplo, en un método getter:
  // get postulacionesFiltradas(): Postulacion[] {
  //   if (!this.filtroNombre) {
  //     return this.postulaciones;
  //   }
  //   // Ejemplo de filtro por ID, VacanteId o Estado (adapta según necesites filtrar)
  //   return this.postulaciones.filter(postulacion =>
  //     postulacion.id?.toString().includes(this.filtroNombre) ||
  //     postulacion.vacanteId.toString().includes(this.filtroNombre) ||
  //     postulacion.estado.toLowerCase().includes(this.filtroNombre.toLowerCase()) // Filtrar también por estado
  //   );
  // }
  // Y en el HTML, usar *ngFor="let postulacion of postulacionesFiltradas;..."
}