import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SolicitudIncapacidad {
  nombre: string;
  tipoIncapacidad: string;
  fechaInicio: string;
  fechaFin: string;
  diasIncapacidad: number;
  motivo?: string; // Campo opcional para el motivo
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

@Component({
  selector: 'app-form-incapacidades',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './form-incapacidades.component.html',
  styleUrls: ['./form-incapacidades.component.scss']
})
export class FormIncapacidadesComponent implements OnInit {
  nombre: string = '';
  tipoIncapacidad: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  diasIncapacidad: number | null = null;
  motivo: string = '';

  solicitudesIncapacidades: SolicitudIncapacidad[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar solicitudes previas si es necesario
    // Por ejemplo, desde un servicio
  }

  enviarSolicitud(): void {
    const nuevaSolicitud: SolicitudIncapacidad = {
      nombre: this.nombre,
      tipoIncapacidad: this.tipoIncapacidad,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      diasIncapacidad: this.diasIncapacidad !== null ? this.diasIncapacidad : 0,
      motivo: this.motivo,
      estado: 'Pendiente'
    };

    this.solicitudesIncapacidades.push(nuevaSolicitud);
    console.log('Solicitudes de incapacidades:', this.solicitudesIncapacidades);
    this.limpiarFormulario();
    alert('Solicitud de incapacidad enviada.');
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.tipoIncapacidad = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.diasIncapacidad = null;
    this.motivo = '';
  }
}