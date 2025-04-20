import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ** IMPORTANTE: DEBES CREAR UN SERVICIO PARA CATEGORÍAS **
// import { CategoriasService, Categoria } from '../../../services/categorias.service';

interface Categoria {
  id?: number;
  nombre: string;
}

import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
// Importa otros módulos si los necesitas (ej: paginación)
// import { NgxPaginationModule } from 'ngx-pagination';

// Importa MenuComponent si tu componente es standalone y usa <app-menu>
import { MenuComponent } from '../../menu/menu.component';

// ** Eliminado: Importación y uso de FilterNombre **


@Component({
  selector: 'app-categoria-vacantes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    // NgxPaginationModule, // Descomentar si usas paginación

    // Eliminado: FilterNombre
  ],
  templateUrl: './categoria-vacantes.component.html',
  styleUrls: ['./categoria-vacantes.component.scss']
})
export class CategoriaVacantesComponent implements OnInit {

  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria = { nombre: '' };
  usuario: any = {};

  // La propiedad filtroNombre se mantiene si quieres usarla para otra cosa o implementarla más tarde
  filtroNombre: string = "";


  constructor(
    // private categoriasService: CategoriasService, // TODO: Descomentar e inyectar tu servicio
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('Usuario logueado:', this.usuario);
    }

    this.cargarCategorias();
  }

  cargarCategorias(): void {
    // TODO: Llama a tu servicio para obtener los datos
    // this.categoriasService.obtenerCategorias().subscribe({
    //   next: (data: Categoria[]) => {
    //     this.categorias = data;
    //     console.log('Categorías cargadas:', this.categorias);
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar categorías', err);
    //     Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
    //   }
    // });

    // TODO: Elimina o reemplaza esta simulación
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

  abrirModalAgregarCategoria(): void {
    this.categoriaSeleccionada = { nombre: '' };
    console.log('Abriendo modal para agregar categoría...');
  }

  editarCategoria(categoria: Categoria, index: number): void {
    this.categoriaSeleccionada = { ...categoria };
    console.log('Editando categoría:', categoria);
  }

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
        // TODO: Llama a tu servicio para eliminar la categoría
        // if (categoria.id === undefined) {
        //   console.error('ID de categoría no disponible para eliminar.');
        //   Swal.fire('Error', 'No se pudo eliminar la categoría (ID no disponible).', 'error');
        //   return;
        // }
        // this.categoriasService.eliminarCategoria(categoria.id).subscribe({
        //   next: (res) => {
        //     Swal.fire({
        //       title: 'Eliminada',
        //       text: `La categoría "${categoria.nombre}" fue eliminada correctamente.`,
        //       icon: 'success',
        //       confirmButtonText: 'Aceptar'
        //     }).then(() => {
        //       this.cargarCategorias();
        //     });
        //   },
        //   error: (err) => {
        //     console.error('Error al eliminar categoría:', err);
        //     Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
        //   }
        // });

        // TODO: Elimina o reemplaza esta simulación
        console.log(`Simulando eliminación de categoría con ID: ${categoria.id}`);
        this.categorias.splice(index, 1);
        Swal.fire('¡Eliminada!', `La categoría "${categoria.nombre}" fue eliminada correctamente.`, 'success');
      }
    });
  }

  guardarCategoria(): void {
    console.log('Intentando guardar nueva categoría:', this.categoriaSeleccionada);

    if (!this.categoriaSeleccionada.nombre) {
      Swal.fire('Error', 'El nombre de la categoría es obligatorio.', 'error');
      return;
    }

    // TODO: Llama a tu servicio para agregar la categoría
    // this.categoriasService.agregarCategoria(this.categoriaSeleccionada).subscribe({
    //   next: (res: Categoria) => {
    //     console.log('Categoría guardada en backend:', res);
    //     this.categorias.push(res);
    //     Swal.fire('¡Agregada!', 'La categoría ha sido guardada correctamente.', 'success');
    //     this.categoriaSeleccionada = { nombre: '' };
    //     // TODO: Cierra el modal manualmente si es necesario
    //   },
    //   error: (err) => {
    //     console.error('Error al guardar categoría:', err);
    //     Swal.fire('Error', 'No se pudo guardar la categoría.', 'error');
    //   }
    // });

    // TODO: Elimina o reemplaza esta simulación
    console.log('Simulando guardado de nueva categoría:', this.categoriaSeleccionada);
    const newId = Math.max(...this.categorias.map(c => c.id || 0), 0) + 1;
    const nuevaCategoriaConId = { ...this.categoriaSeleccionada, id: newId };
    this.categorias.push(nuevaCategoriaConId);
    Swal.fire('¡Agregada!', 'La categoría ha sido guardada correctamente (simulado).', 'success');
    this.categoriaSeleccionada = { nombre: '' };
    // TODO: Cierra el modal si es necesario
  }

  guardarCambiosCategoria(): void {
    console.log('Intentando actualizar categoría:', this.categoriaSeleccionada);

     if (!this.categoriaSeleccionada.nombre || this.categoriaSeleccionada.id === undefined) {
      Swal.fire('Error', 'Datos de categoría inválidos para actualizar.', 'error');
      return;
    }

    // TODO: Llama a tu servicio para actualizar la categoría
    // this.categoriasService.actualizarCategoria(this.categoriaSeleccionada.id, this.categoriaSeleccionada).subscribe({
    //   next: (res: Categoria) => {
    //     console.log('Categoría actualizada en backend:', res);
    //     const index = this.categorias.findIndex(c => c.id === res.id);
    //     if (index !== -1) {
    //       this.categorias[index] = res;
    //     }
    //     Swal.fire('¡Actualizada!', 'La categoría fue editada exitosamente.', 'success');
    //     // TODO: Cierra el modal manualmente si es necesario
    //   },
    //   error: (err) => {
    //     console.error('Error al actualizar categoría:', err);
    //     Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
    //   }
    // });

    // TODO: Elimina o reemplaza esta simulación
    console.log('Simulando actualización de categoría:', this.categoriaSeleccionada);
    const index = this.categorias.findIndex(c => c.id === this.categoriaSeleccionada.id);
    if (index !== -1) {
      this.categorias[index] = { ...this.categoriaSeleccionada };
      Swal.fire('¡Actualizada!', 'La categoría fue editada exitosamente (simulado).', 'success');
      // TODO: Cierra el modal si es necesario
    } else {
      console.error('Categoría no encontrada para actualizar en el array local.');
      Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
    }
  }

  // Si no usas un pipe y prefieres filtrar en el TS, necesitarías un método como este:
  // get categoriasFiltradas(): Categoria[] {
  //   if (!this.filtroNombre) {
  //     return this.categorias;
  //   }
  //   return this.categorias.filter(categoria =>
  //     categoria.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
  //   );
  // }
  // Y en el HTML, usarías *ngFor="let categoria of categoriasFiltradas;..."

}