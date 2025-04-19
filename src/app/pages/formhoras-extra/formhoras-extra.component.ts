import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SolicitudHorasExtra {
  nombre: string;
  cargo: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  cantidadHoras: number;
  estado: 'Pendiente' | 'Completado' | 'Rechazado';
}

@Component({
  selector: 'app-formhoras-extra',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './formhoras-extra.component.html',
  styleUrls: ['./formhoras-extra.component.scss']
})
export class FormhorasExtraComponent implements OnInit {
  nombre: string = '';
  cargo: string = '';
  fecha: string = '';
  horaInicio: string = '';
  horaFin: string = '';
  cantidadHoras: number = 0;

  solicitudesHorasExtra: SolicitudHorasExtra[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías cargar solicitudes previas si es necesario
    // Por ejemplo, desde un servicio
  }

  enviarSolicitud(): void {
    const nuevaSolicitud: SolicitudHorasExtra = {
      nombre: this.nombre,
      cargo: this.cargo,
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin,
      cantidadHoras: this.cantidadHoras,
      estado: 'Pendiente'
    };

    this.solicitudesHorasExtra.push(nuevaSolicitud);
    console.log('Solicitudes de horas extra:', this.solicitudesHorasExtra);
    this.limpiarFormulario();
    alert('Solicitud de horas extra enviada.');
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.cargo = '';
    this.fecha = '';
    this.horaInicio = '';
    this.horaFin = '';
    this.cantidadHoras = 0;
  }
}