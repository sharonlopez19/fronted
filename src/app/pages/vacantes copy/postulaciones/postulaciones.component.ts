import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Postulacion {
  id?: number;
  fechaPostulacion: string;
  estado: 'Aceptado' | 'Rechazado' | 'Pendiente';
  vacanteId: number;
}

import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

import { MenuComponent } from '../../menu/menu.component';

import { FilterPostulacionPipe } from './filter-postulaciones'; // Importación del Pipe de Filtrado


@Component({
  selector: 'app-postulaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    FilterPostulacionPipe, // Adición del Pipe al array de imports
  ],
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.scss']
})
export class PostulacionesComponent implements OnInit {

  postulaciones: Postulacion[] = [];
  filtroNombre: string = "";
  usuario: any = {};
  postulacionSeleccionada: Postulacion | null = null;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
    }

    this.cargarPostulaciones();
  }

  cargarPostulaciones(): void {
    this.postulaciones = [
      { id: 1, fechaPostulacion: '2023-10-26', estado: 'Aceptado', vacanteId: 1 },
      { id: 2, fechaPostulacion: '2023-10-25', estado: 'Pendiente', vacanteId: 2 },
      { id: 3, fechaPostulacion: '2023-10-24', estado: 'Rechazado', vacanteId: 1 },
      { id: 4, fechaPostulacion: '2023-10-23', estado: 'Pendiente', vacanteId: 3 },
      { id: 5, fechaPostulacion: '2023-10-22', estado: 'Aceptado', vacanteId: 4 },
      { id: 6, fechaPostulacion: '2023-10-21', estado: 'Rechazado', vacanteId: 2 },
    ];
  }

  editarPostulacion(postulacion: Postulacion, index: number): void {
    this.postulacionSeleccionada = { ...postulacion };
  }

  verDetalles(postulacion: Postulacion): void {
      this.postulacionSeleccionada = postulacion;
  }

  guardarEstadoPostulacion(): void {
    if (!this.postulacionSeleccionada || this.postulacionSeleccionada.id === undefined) {
      Swal.fire('Error', 'No se ha seleccionado una postulación válida para actualizar.', 'error');
      return;
    }

    const selectedPostulacion = this.postulacionSeleccionada;

    const index = this.postulaciones.findIndex(p => p.id === selectedPostulacion.id);
    if (index !== -1) {
      this.postulaciones[index].estado = selectedPostulacion.estado;
    }
    Swal.fire('¡Actualizado!', 'Estado de postulación guardado correctamente (simulado).', 'success');
    this.postulacionSeleccionada = null;
  }

  confirmDeletePostulacion(index: number): void {
       console.warn("La función confirmDeletePostulacion no se llama directamente desde el HTML con el icono de ojo. Si necesitas eliminar, añade un botón de eliminar separado.");
   }
}