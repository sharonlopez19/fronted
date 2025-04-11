import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent {
  vacaciones = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', estado: 'Completado', fechaInicio: '15/07/24', fechaFin: '19/12/24' },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', estado: 'Rechazado', fechaInicio: '17/07/24', fechaFin: '03/08/24' }
  ];

  vacacionEditada: any = {};
  nuevaVacacion: any = {};
  mostrarAgregarModal: boolean = false;

  agregarVacacion(): void {
    this.nuevaVacacion = { estado: 'Activo' }; // Establecer 'Activo' como estado por defecto
    this.mostrarAgregarModal = true;
    const modal = document.getElementById('agregarModal') as HTMLElement;
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  editarVacacion(vacacion: any): void {
    this.vacacionEditada = { ...vacacion };
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  guardarNuevaVacacion(): void {
    if (this.nuevaVacacion.nombre && this.nuevaVacacion.cargo && this.nuevaVacacion.fechaInicio && this.nuevaVacacion.fechaFin && this.nuevaVacacion.estado) {
      const nuevoId = this.vacaciones.length > 0 ? Math.max(...this.vacaciones.map(v => v.id)) + 1 : 1;
      this.vacaciones = [...this.vacaciones, { id: nuevoId, ...this.nuevaVacacion }];
      this.cerrarAgregarModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  guardarEdicion(): void {
    const index = this.vacaciones.findIndex(v => v.id === this.vacacionEditada.id);
    if (index !== -1) {
      this.vacaciones[index] = { ...this.vacacionEditada };
    }
    this.cerrarModalEditar();
  }

  cerrarModalEditar(): void {
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
  }

  cerrarAgregarModal(): void {
    this.mostrarAgregarModal = false;
    const modal = document.getElementById('agregarModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    this.nuevaVacacion = {};
  }

  eliminarVacacion(id: number): void {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar esta vacación?');
    if (confirmado) {
      this.vacaciones = this.vacaciones.filter(v => v.id !== id);
    }
  }

  generarReporte(): void {
    alert('Generando reporte de vacaciones...');
  }
}

