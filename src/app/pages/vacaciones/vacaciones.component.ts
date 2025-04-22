import { Component, OnInit } from '@angular/core';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { FilterVacacion } from './filter-vacacion';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, NgxPaginationModule, FilterVacacion]
})
export class VacacionesComponent implements OnInit {
  vacaciones: any[] = [];
  vacacionSeleccionada: any = {};
  filtroNombreVacacion: string = '';
  usuario: any;
  archivoSeleccionado: File | null = null;

  constructor(private vacacionesService: VacacionesService) {}

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
    }

    this.obtenerVacaciones();
  }

  obtenerVacaciones(): void {
    this.vacacionesService.obtenerVacaciones().subscribe({
      next: (data) => {
        this.vacaciones = data;
        console.log('Vacaciones cargadas:', this.vacaciones);
      },
      error: (err) => {
        console.error('Error al cargar vacaciones', err);
      }
    });
    console.log('Vacaciones cargadas:', this.vacaciones);
  }

  abrirModalAgregarVacacion() {
    this.vacacionSeleccionada = {};
    this.archivoSeleccionado = null;
  }

  editarVacacion(vacacion: any): void {
    this.vacacionSeleccionada = { ...vacacion };
  }

  confirmDeleteVacacion(vacacion: any): void {
    if (confirm(`¿Estás seguro de eliminar la vacación "${vacacion.descrip}"?`)) {
      this.vacacionesService.eliminarVacacion(vacacion.idVacaciones).subscribe(() => {
        this.obtenerVacaciones();
      });
    }
  }

  guardarVacacion(): void {
    if (this.vacacionSeleccionada?.idVacaciones) {
      // Si estás editando y no manejas archivo en la edición, puedes usar el objeto normal
      this.vacacionesService.actualizarVacacionParcial(this.vacacionSeleccionada.idVacaciones, this.vacacionSeleccionada).subscribe({
        next: () => this.obtenerVacaciones(),
        error: (err) => console.error('Error al editar vacación:', err)
      });
    } else {
      // Al crear, usamos FormData para incluir el archivo
      const formData = new FormData();
      formData.append('descrip', this.vacacionSeleccionada.descrip || '');
      formData.append('fechaInicio', this.vacacionSeleccionada.fechaInicio || '');
      formData.append('fechaFinal', this.vacacionSeleccionada.fechaFinal || '');
      formData.append('contratoId', this.vacacionSeleccionada.contratoId?.toString() || '');
  
      if (this.archivoSeleccionado) {
        formData.append('archivo', this.archivoSeleccionado);
      }
  
      this.vacacionesService.agregarVacacion(formData).subscribe({
        next: () => {
          this.obtenerVacaciones();               // Recarga la lista
          this.vacacionSeleccionada = {};         // Limpia el formulario
          this.archivoSeleccionado = null;        // Limpia el archivo
        },
        error: (err) => {
          console.error('Error al agregar vacación:', err);
        }
      });
    }
  }
  

  onArchivoSeleccionado(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }
}
