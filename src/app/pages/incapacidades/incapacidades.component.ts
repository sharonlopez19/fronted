import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from "../menu/menu.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-incapacidades',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, FontAwesomeModule],
  templateUrl: './incapacidades.component.html',
  styleUrls: ['./incapacidades.component.scss']
})
export class IncapacidadesComponent {
  incapacidades = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', totalDias: 3, fechaInicio: '2024-07-15', fechaFinal: '2024-07-18', estado: 'Aprobado' },
  ];

  incapacidadEditada: any = {
    id: null,
    nombre: '',
    cargo: '',
    totalDias: 0,
    fechaInicio: '',
    fechaFinal: '',
    estado: 'Pendiente'
  };

  modalAbierto: boolean = false;
  mostrarAgregarModalIncapacidad: boolean = false;
  nuevaIncapacidad: any = {
    nombre: '',
    cargo: '',
    totalDias: null,
    fechaInicio: '',
    fechaFinal: '',
    estado: 'Pendiente'
  };

  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrash;

  agregarIncapacidad() {
    this.mostrarAgregarModalIncapacidad = true;
    this.nuevaIncapacidad = { nombre: '', cargo: '', totalDias: null, fechaInicio: '', fechaFinal: '', estado: 'Pendiente' };
  }

  cerrarAgregarModalIncapacidad() {
    this.mostrarAgregarModalIncapacidad = false;
  }

  guardarNuevaIncapacidad() {
    console.log('Guardar nueva incapacidad:', this.nuevaIncapacidad);
    this.incapacidades = [...this.incapacidades, { id: this.incapacidades.length + 1, ...this.nuevaIncapacidad }];
    this.cerrarAgregarModalIncapacidad();
    this.nuevaIncapacidad = { nombre: '', cargo: '', totalDias: null, fechaInicio: '', fechaFinal: '', estado: 'Pendiente' };
  }

  editarIncapacidad(incapacidad: any) {
    this.incapacidadEditada = { ...incapacidad };
    this.modalAbierto = true;
  }

  guardarIncapacidad() {
    const index = this.incapacidades.findIndex(i => i.id === this.incapacidadEditada.id);
    if (index !== -1) {
      this.incapacidades[index] = { ...this.incapacidadEditada };
    }
    this.modalAbierto = false;
    this.incapacidadEditada = { id: null, nombre: '', cargo: '', totalDias: 0, fechaInicio: '', fechaFinal: '', estado: 'Pendiente' };
  }

  cancelarEdicion() {
    this.modalAbierto = false;
    this.incapacidadEditada = { id: null, nombre: '', cargo: '', totalDias: 0, fechaInicio: '', fechaFinal: '', estado: 'Pendiente' };
  }

  eliminarIncapacidad(id: number) {
    const confirmado = confirm(`¿Seguro que quieres eliminar la incapacidad con ID ${id}?`);
    if (confirmado) {
      this.incapacidades = this.incapacidades.filter(incapacidad => incapacidad.id !== id);
    }
  }

  generarReporte() {
    console.log('Generar reporte de incapacidades');
  }
}