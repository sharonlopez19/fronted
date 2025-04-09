import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { MenuComponent } from "../menu/menu.component";

@Component({
  selector: 'app-incapacidades',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],  // Asegúrate de incluir FormsModule aquí
  templateUrl: './incapacidades.component.html',
  styleUrls: ['./incapacidades.component.scss']
})
export class IncapacidadesComponent {
  incapacidades = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', totalDias: 3, fechaInicio: '15/07/24', fechaFinal: '18/07/24' },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', totalDias: 5, fechaInicio: '17/07/24', fechaFinal: '22/07/24' },
    { id: 3, nombre: 'Michael Clark', cargo: 'Asesor', totalDias: 8, fechaInicio: '18/07/24', fechaFinal: '26/07/24' },
    { id: 4, nombre: 'Richard Owens', cargo: 'Director', totalDias: 1, fechaInicio: '30/12/24', fechaFinal: '31/12/24' },
    { id: 5, nombre: 'Johana Castro', cargo: 'Asesor', totalDias: 30, fechaInicio: '10/09/24', fechaFinal: '09/10/24' },
    { id: 6, nombre: 'Alexa Liras', cargo: 'Desarrollador', totalDias: 6, fechaInicio: '16/07/24', fechaFinal: '22/07/24' },
    { id: 7, nombre: 'Diego Mahecha', cargo: 'Programador', totalDias: 15, fechaInicio: '18/07/24', fechaFinal: '02/08/24' },
    { id: 8, nombre: 'Diana Betancourt', cargo: 'Analista', totalDias: 3, fechaInicio: '11/02/24', fechaFinal: '14/02/24' },
    { id: 9, nombre: 'Carlos Yordan', cargo: 'Asesor', totalDias: 2, fechaInicio: '09/10/24', fechaFinal: '11/10/24' },
    { id: 10, nombre: 'Alexander Gusman', cargo: 'Coordinador', totalDias: 18, fechaInicio: '01/12/24', fechaFinal: '19/12/24' }
  ];

  incapacidadEditada: any = {
    id: null,
    nombre: '',
    cargo: '',
    totalDias: 0,
    fechaInicio: '',
    fechaFinal: ''
  };

  modalAbierto: boolean = false;

  agregarIncapacidad() {
    console.log('Agregar nueva incapacidad');
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
  }

  cancelarEdicion() {
    this.modalAbierto = false;
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
