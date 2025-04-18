import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SolicitudVacaciones {
  nombre: string;
  cargo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'pendiente' | 'rechazado' | 'aprobado';
}

@Component({
  selector: 'app-formhoras-extra',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './formhoras-extra.component.html',
  styleUrls: ['./formhoras-extra.component.scss']
})
export class FormvacacionesComponent implements OnInit {
  nombre: string = '';
  cargo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';

  solicitudesVacaciones: SolicitudVacaciones[] = [];

  constructor() { }

  ngOnInit(): void {
    // Puedes agregar lógica para cargar solicitudes previas aquí si es necesario
    // Por ejemplo, desde un servicio
  }

  enviarSolicitud(): void {
    const nuevaSolicitud: SolicitudVacaciones = {
      nombre: this.nombre,
      cargo: this.cargo,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      estado: 'pendiente'
    };

    this.solicitudesVacaciones.push(nuevaSolicitud);
    console.log('Solicitudes de vacaciones:', this.solicitudesVacaciones);
    this.limpiarFormulario();
    alert('Solicitud de vacaciones enviada.');
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.cargo = '';
    this.fechaInicio = '';
    this.fechaFin = '';
  }
}