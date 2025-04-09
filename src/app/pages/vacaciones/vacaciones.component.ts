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
    {
      id: 1,
      nombre: 'John Michael',
      cargo: 'Asesor',
      estado: 'Completado',
      fechaInicio: '15/07/24',
      fechaFin: '19/12/24'
    },
    {
      id: 2,
      nombre: 'Laurent Perrier',
      cargo: 'Programador',
      estado: 'Rechazado',
      fechaInicio: '17/07/24',
      fechaFin: '03/08/24'
    },
    {
      id: 3,
      nombre: 'Michael Clark',
      cargo: 'Asesor',
      estado: 'Completado',
      fechaInicio: '18/07/24',
      fechaFin: '19/12/24'
    },
    {
      id: 4,
      nombre: 'Richard Owens',
      cargo: 'Director',
      estado: 'Pendiente',
      fechaInicio: '30/12/24',
      fechaFin: '03/03/25'
    },
    {
      id: 5,
      nombre: 'Johana Castro',
      cargo: 'Asesor',
      estado: 'Completado',
      fechaInicio: '10/09/24',
      fechaFin: '05/10/24'
    },
    {
      id: 6,
      nombre: 'Alexa Liras',
      cargo: 'Desarrollador',
      estado: 'Pendiente',
      fechaInicio: '16/07/24',
      fechaFin: '31/09/24'
    },
    {
      id: 7,
      nombre: 'Diego Mahecha',
      cargo: 'Programador',
      estado: 'Completado',
      fechaInicio: '18/07/24',
      fechaFin: '25/09/24'
    },
    {
      id: 8,
      nombre: 'Diana Betancourt',
      cargo: 'Analista',
      estado: 'Rechazado',
      fechaInicio: '11/02/24',
      fechaFin: '30/02/24'
    },
    {
      id: 9,
      nombre: 'Carlos Yordan',
      cargo: 'Asesor',
      estado: 'Completado',
      fechaInicio: '09/10/24',
      fechaFin: '09/11/24'
    },
    {
      id: 10,
      nombre: 'Alexander Guzman',
      cargo: 'Coordinador',
      estado: 'Completado',
      fechaInicio: '10/12/24',
      fechaFin: '07/01/25'
    }
  ];

  vacacionEditada: any = {};  // Objeto para almacenar la vacación que se va a editar

  agregarVacacion(): void {
    alert('Función para agregar una nueva vacación');
  }

  // Método para abrir el modal y asignar los datos de la vacación a editar
  editarVacacion(vacacion: any): void {
    this.vacacionEditada = { ...vacacion };  // Clonamos la vacación para editarla
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  // Método para guardar los cambios de la vacación editada
  guardarEdicion(): void {
    const index = this.vacaciones.findIndex(v => v.id === this.vacacionEditada.id);
    if (index !== -1) {
      this.vacaciones[index] = { ...this.vacacionEditada };
    }
    this.cerrarModal();  // Cerramos el modal después de guardar los cambios
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
  }

  // Método para eliminar la vacación
  eliminarVacacion(id: number): void {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar esta vacación?');
    if (confirmado) {
      this.vacaciones = this.vacaciones.filter(v => v.id !== id);
    }
  }

  // Método para generar reporte
  generarReporte(): void {
    alert('Generando reporte de vacaciones...');
  }
}
