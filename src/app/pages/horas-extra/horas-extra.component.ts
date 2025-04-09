import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el binding con ngModel
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-horas-extra',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './horas-extra.component.html',
  styleUrls: ['./horas-extra.component.scss']
})
export class HorasExtraComponent {
  horasExtras = [
    {
      id: 1,
      nombre: 'John Michael',
      cargo: 'Asesor',
      fecha: '15/07/24',
      horaInicio: '17:00',
      horaFinal: '20:00',
      totalHoras: 3,
      estado: 'completado'
    },
    {
      id: 2,
      nombre: 'Laurent Perrier',
      cargo: 'Programador',
      fecha: '17/07/24',
      horaInicio: '18:00',
      horaFinal: '22:00',
      totalHoras: 4,
      estado: 'pendiente'
    },
    {
      id: 3,
      nombre: 'Michael Clark',
      cargo: 'Desarrollador',
      fecha: '18/07/24',
      horaInicio: '16:00',
      horaFinal: '21:00',
      totalHoras: 5,
      estado: 'completado'
    },
    {
      id: 4,
      nombre: 'Diana Betancourt',
      cargo: 'Analista',
      fecha: '19/07/24',
      horaInicio: '17:30',
      horaFinal: '20:30',
      totalHoras: 3,
      estado: 'rechazado'
    },
    {
      id: 5,
      nombre: 'Carlos Yordan',
      cargo: 'Asesor',
      fecha: '20/07/24',
      horaInicio: '15:00',
      horaFinal: '20:00',
      totalHoras: 5,
      estado: 'completado'
    },
    {
      id: 6,
      nombre: 'Alexa Liras',
      cargo: 'Desarrollador',
      fecha: '21/07/24',
      horaInicio: '14:00',
      horaFinal: '19:00',
      totalHoras: 5,
      estado: 'pendiente'
    },
    {
      id: 7,
      nombre: 'Richard Owens',
      cargo: 'Director',
      fecha: '22/07/24',
      horaInicio: '16:30',
      horaFinal: '21:30',
      totalHoras: 5,
      estado: 'completado'
    },
    {
      id: 8,
      nombre: 'Diego Mahecha',
      cargo: 'Programador',
      fecha: '23/07/24',
      horaInicio: '17:00',
      horaFinal: '20:00',
      totalHoras: 3,
      estado: 'pendiente'
    }
  ];

  // Variables para el modal de edición
  modalVisible: boolean = false;
  horaExtraEditada: any = {};

  agregarHorasExtras(): void {
    alert('Función para agregar horas extras');
  }

  // Abre el modal para editar pasándole el objeto a editar
  editarHorasExtras(horaExtra: any): void {
    this.horaExtraEditada = { ...horaExtra }; // Clonamos el objeto para editar sin alterar el original inmediatamente
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

  eliminarHorasExtras(horaExtra: any): void {
    const confirmado = confirm(`¿Estás seguro de eliminar las horas extras de ${horaExtra.nombre}?`);
    if (confirmado) {
      this.horasExtras = this.horasExtras.filter(h => h.id !== horaExtra.id);
    }
  }

  generarReporte(): void {
    alert('Generando reporte de horas extras...');
  }
}
