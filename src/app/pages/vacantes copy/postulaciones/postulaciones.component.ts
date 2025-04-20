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
    FormsModule,
    MenuComponent,
    // NgxPaginationModule, // Descomentar si usas paginación
    // No incluimos el pipe de filtro aquí por ahora
  ],
  templateUrl: './postulaciones.component.html', // Plantilla HTML que creamos
  styleUrls: ['./postulaciones.component.scss'] // Archivo SCSS que copiamos
})
export class PostulacionesComponent implements OnInit {

  postulaciones: Postulacion[] = []; // Array para almacenar la lista de postulaciones

  // Variable para la barra de búsqueda (sin funcionalidad de filtro aún)
  filtroNombre: string = "";

  usuario: any = {}; // Variable para almacenar el usuario logueado (para verificaciones de rol)

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
    ];
  }

  // Método placeholder para editar una postulación (ajustar lógica según necesites)
  editarPostulacion(postulacion: Postulacion, index: number): void {
    console.log('Lógica para editar postulación:', postulacion);
    // TODO: Implementar lógica para editar, quizás abrir un modal o navegar a otra vista
  }

  // Método placeholder para confirmar la eliminación de una postulación (ajustar lógica)
  confirmDeletePostulacion(index: number): void {
    const postulacion = this.postulaciones[index];
    Swal.fire({
      title: `¿Eliminar la postulación #${postulacion.id}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Simulando eliminación de postulación con ID: ${postulacion.id}`);
        // TODO: Llama a tu servicio para eliminar la postulación
        // if (postulacion.id === undefined) {
        //   console.error('ID de postulación no disponible para eliminar.');
        //   Swal.fire('Error', 'No se pudo eliminar la postulación (ID no disponible).', 'error');
        //   return;
        // }
        // this.postulacionesService.eliminarPostulacion(postulacion.id).subscribe({
        //   next: (res) => {
        //     Swal.fire({
        //       title: 'Eliminada',
        //       text: `La postulación #${postulacion.id} fue eliminada correctamente.`,
        //       icon: 'success',
        //       confirmButtonText: 'Aceptar'
        //     }).then(() => {
        //       this.cargarPostulaciones(); // Recargar la lista
        //     });
        //   },
        //   error: (err) => {
        //     console.error('Error al eliminar postulación:', err);
        //     Swal.fire('Error', 'No se pudo eliminar la postulación.', 'error');
        //   }
        // });

        // TODO: Elimina o reemplaza esta simulación
        this.postulaciones.splice(index, 1); // Elimina del array local
        Swal.fire('¡Eliminada!', `La postulación #${postulacion.id} fue eliminada correctamente (simulado).`, 'success');
      }
    });
  }

  // TODO: Si necesitas la funcionalidad de filtrado, puedes:
  // 1. Reintroducir un pipe de filtro (ajustado para las propiedades de Postulacion)
  // 2. Implementar la lógica de filtrado directamente en el TS, por ejemplo, en un método getter:
  // get postulacionesFiltradas(): Postulacion[] {
  //   if (!this.filtroNombre) {
  //     return this.postulaciones;
  //   }
  //   // Ejemplo de filtro por ID o VacanteId (adapta según necesites filtrar)
  //   return this.postulaciones.filter(postulacion =>
  //     postulacion.id?.toString().includes(this.filtroNombre) ||
  //     postulacion.vacanteId.toString().includes(this.filtroNombre) ||
  //     postulacion.estado.toLowerCase().includes(this.filtroNombre.toLowerCase()) // Filtrar también por estado
  //   );
  // }
  // Y en el HTML, usar *ngFor="let postulacion of postulacionesFiltradas;..."
}