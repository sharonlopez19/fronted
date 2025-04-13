import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

interface HoraExtra {
  id: number;
  nombre: string;
  cargo: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  totalHoras: number;
  estado: string;
}

@Component({
  selector: 'app-horas-extra',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './horas-extra.component.html',
  styleUrls: ['./horas-extra.component.scss']
})
export class HorasExtraComponent {
  horasExtras: HoraExtra[] = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', fecha: '2024-07-15', horaInicio: '17:00', horaFinal: '20:00', totalHoras: 3, estado: 'completado' },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', fecha: '2024-07-17', horaInicio: '18:00', horaFinal: '22:00', totalHoras: 4, estado: 'pendiente' }
  ];

  modalVisible: boolean = false;
  horaExtraEditada: HoraExtra = {} as HoraExtra;
  nuevaHoraExtra: HoraExtra = {} as HoraExtra;
  mostrarAgregarModalIncapacidad: boolean = false;

  agregarHorasExtras(): void {
    this.nuevaHoraExtra = {} as HoraExtra;
    this.mostrarAgregarModalIncapacidad = true;
  }

  editarHorasExtras(horaExtra: HoraExtra): void {
    this.horaExtraEditada = { ...horaExtra };
    this.modalVisible = true;
  }

  guardarEdicion(): void {
    const index = this.horasExtras.findIndex(h => h.id === this.horaExtraEditada.id);
    if (index !== -1) {
      this.horasExtras[index] = { ...this.horaExtraEditada };
    }
    this.modalVisible = false;
  }

  cancelarEdicion(): void {
    this.modalVisible = false;
  }

  eliminarHorasExtras(horaExtra: HoraExtra): void {
    const confirmado = confirm(`¿Estás seguro de eliminar las horas extras de ${horaExtra.nombre}?`);
    if (confirmado) {
      this.horasExtras = this.horasExtras.filter(h => h.id !== horaExtra.id);
    }
  }

  generarReporte(): void {
    alert('Generando reporte de horas extras...');
  }

  guardarNuevaIncapacidad(): void {
    this.horasExtras.push({ ...this.nuevaHoraExtra });
    this.mostrarAgregarModalIncapacidad = false;
    this.nuevaHoraExtra = {} as HoraExtra;
  }

  cerrarAgregarModalIncapacidad(): void {
    this.mostrarAgregarModalIncapacidad = false;
  }
}