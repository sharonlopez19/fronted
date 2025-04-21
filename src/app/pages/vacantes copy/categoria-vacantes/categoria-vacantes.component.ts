import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// --- Importación de la interfaz Categoria (esto ya lo tenías) ---
export interface Categoria {
  id?: number;
  nombre: string;
}

// --- Importación del Pipe de Filtrado (¡Esto es lo añadido para el filtro!) ---
// ASEGÚRATE de que la ruta './filter-categoria' sea correcta
// dependiendo de dónde guardaste el archivo filter-categoria.ts
import { FilterCategoriaPipe } from './filter-categoria';


import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

import { MenuComponent } from '../../menu/menu.component';


@Component({
  selector: 'app-categoria-vacantes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    FilterCategoriaPipe, // <-- ¡El Pipe de filtrado añadido aquí!
  ],
  templateUrl: './categoria-vacantes.component.html',
  styleUrls: ['./categoria-vacantes.component.scss']
})
export class CategoriaVacantesComponent implements OnInit {

  // --- Propiedad para la lista de categorías (ya la tenías) ---
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria = { nombre: '' };
  usuario: any = {};

  // --- Propiedad para el filtro (ya la tenías) ---
  filtroNombre: string = "";


  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('Usuario logueado:', this.usuario);
    }

    this.cargarCategorias(); // Esto carga los datos de ejemplo iniciales
  }

  // --- Método para cargar categorías (simulado, ya lo tenías) ---
  cargarCategorias(): void {
    console.log('Simulando carga de categorías...');
    this.categorias = [
      { id: 1, nombre: 'Desarrollador Frontend' },
      { id: 2, nombre: 'Desarrollador Backend' },
      { id: 3, nombre: 'Diseñador UX/UI' },
      { id: 4, nombre: 'Gerente de Proyecto' },
      { id: 5, nombre: 'Analista de Datos' },
      { id: 6, nombre: 'Tester QA' },
      { id: 7, nombre: 'Administrador de Sistemas' },
    ];
  }

  // --- Método para abrir modal de agregar (ya lo tenías) ---
  abrirModalAgregarCategoria(): void {
    this.categoriaSeleccionada = { nombre: '' };
    console.log('Abriendo modal para agregar categoría...');
  }

  // --- Método para editar categoría (ya lo tenías) ---
  editarCategoria(categoria: Categoria, index: number): void {
    this.categoriaSeleccionada = { ...categoria };
    console.log('Editando categoría:', categoria);
  }

  // --- Método para confirmar eliminación (simulado, ya lo tenías) ---
  confirmDeleteCategoria(index: number): void {
    const categoria = this.categorias[index];
    Swal.fire({
      title: `¿Eliminar la categoría "${categoria.nombre}"?`,
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
        console.log(`Simulando eliminación de categoría con ID: ${categoria.id}`);
        // Simula la eliminación del array local
        this.categorias.splice(index, 1);
        Swal.fire('¡Eliminada!', `La categoría "${categoria.nombre}" fue eliminada correctamente.`, 'success');
        // Nota: Aquí deberías llamar a tu servicio para eliminar en la API real
      }
    });
  }

  // --- Método para guardar nueva categoría (simulado, ya lo tenías) ---
  guardarCategoria(): void {
    console.log('Intentando guardar nueva categoría:', this.categoriaSeleccionada);

    if (!this.categoriaSeleccionada.nombre) {
      Swal.fire('Error', 'El nombre de la categoría es obligatorio.', 'error');
      return;
    }

    console.log('Simulando guardado de nueva categoría:', this.categoriaSeleccionada);
    // Simula la adición con un nuevo ID
    const newId = Math.max(...this.categorias.map(c => c.id || 0), 0) + 1;
    const nuevaCategoriaConId = { ...this.categoriaSeleccionada, id: newId };
    this.categorias.push(nuevaCategoriaConId); // Añade al array local
    Swal.fire('¡Agregada!', 'La categoría ha sido guardada correctamente (simulado).', 'success');
    this.categoriaSeleccionada = { nombre: '' }; // Limpia el formulario
    // Nota: Aquí deberías llamar a tu servicio para guardar en la API real
  }

  // --- Método para guardar cambios de categoría (simulado, ya lo tenías) ---
  guardarCambiosCategoria(): void {
    console.log('Intentando actualizar categoría:', this.categoriaSeleccionada);

    if (!this.categoriaSeleccionada.nombre || this.categoriaSeleccionada.id === undefined) {
      Swal.fire('Error', 'Datos de categoría inválidos para actualizar.', 'error');
      return;
    }

    console.log('Simulando actualización de categoría:', this.categoriaSeleccionada);
    // Simula la actualización en el array local
    const index = this.categorias.findIndex(c => c.id === this.categoriaSeleccionada.id);
    if (index !== -1) {
      this.categorias[index] = { ...this.categoriaSeleccionada };
      Swal.fire('¡Actualizada!', 'La categoría fue editada exitosamente (simulado).', 'success');
      // Nota: Aquí deberías llamar a tu servicio para actualizar en la API real
    } else {
      console.error('Categoría no encontrada para actualizar en el array local.');
      Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
    }
  }
}