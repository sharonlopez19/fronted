import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IncapacidadesService } from 'src/app/services/incapacidades.service';
import { FilterIncapacidad } from './filter-incapacidad';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-incapacidades',
  templateUrl: './incapacidades.component.html',
  imports: [CommonModule, FormsModule, MenuComponent,NgxPaginationModule,FilterIncapacidad],
  styleUrls: ['./incapacidades.component.scss']
})
export class IncapacidadesComponent implements OnInit {
  incapacidades: any[] = [];
  incapacidadSeleccionada: any = {};
  filtroNombreIncapacidad: string = '';
  usuario: any;
  archivoSeleccionado: File | null = null;
  categorias: any[] = []; // si más adelante necesitas categorías u otros datos asociados

  constructor(
    public authService: AuthService,
    private incapacidadesService: IncapacidadesService
  ) {}

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('Usuario logueado:', this.usuario);
    }

    this.obtenerIncapacidades();
  }

  obtenerIncapacidades(): void {
    this.incapacidadesService.obtenerIncapacidades().subscribe({
      next: (data) => {
        this.incapacidades = data;
        console.log('Incapacidades cargadas:', this.incapacidades);
      },
      error: (err) => {
        console.error('Error al obtener incapacidades:', err);
      }
    });
    console.log('Incapacidades cargadas:', this.incapacidades);

  }

  abrirModalAgregarIncapacidad(): void {
    this.incapacidadSeleccionada = {};
  }

  editarIncapacidad(incapacidad: any): void {
    this.incapacidadSeleccionada = { ...incapacidad };
  }

  guardarIncapacidad(): void {
    if (this.incapacidadSeleccionada?.idIncapacidad) {
      // Si estás editando y no manejas archivo en la edición, puedes seguir con objeto normal
      this.incapacidadesService.editarIncapacidad(this.incapacidadSeleccionada).subscribe({
        next: () => this.obtenerIncapacidades(),
        error: (err) => console.error('Error al editar incapacidad:', err)
      });
    } else {
      // Aquí va la parte importante: usar FormData
      const formData = new FormData();
      formData.append('descrip', this.incapacidadSeleccionada.descrip || '');
      formData.append('fechaInicio', this.incapacidadSeleccionada.fechainicio || '');
      formData.append('fechaFinal', this.incapacidadSeleccionada.fechaFinal || '');
      formData.append('contratoId', this.incapacidadSeleccionada.contratoId?.toString() || '');
  
      if (this.archivoSeleccionado) {
        formData.append('archivo', this.archivoSeleccionado);
      }
  
      this.incapacidadesService.agregarIncapacidad(formData).subscribe({
        next: () => {
          this.obtenerIncapacidades();
          this.incapacidadSeleccionada = {}; // Limpia el formulario
          this.archivoSeleccionado = null;
        },
        error: (err) => {
          console.error('Error al agregar incapacidad:', err);
        }
      });
    }
  }
  
  
  confirmDeleteIncapacidad(incapacidad: any): void {
    if (confirm('¿Estás seguro de eliminar esta incapacidad?')) {
      this.incapacidadesService.eliminarIncapacidad(incapacidad.idIncapacidad).subscribe({
        next: () => this.obtenerIncapacidades(),
        error: (err) => console.error('Error al eliminar incapacidad:', err)
      });
    }
  }
  onArchivoSeleccionado(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
    }
  }

  
}
