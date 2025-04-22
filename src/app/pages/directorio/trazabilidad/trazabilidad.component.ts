import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrazabilidadService, Trazabilidad } from 'src/app/services/trazabilidad.service';
import Swal from 'sweetalert2';
import { MenuComponent } from '../../menu/menu.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trazabilidad',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, MenuComponent],
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.scss']
})
export class TrazabilidadComponent implements OnInit {
  trazabilidad: Trazabilidad[] = [];
  filtro: string = '';
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private trazabilidadService: TrazabilidadService) {}

  ngOnInit(): void {
    this.cargarTrazabilidad();
  }

  cargarTrazabilidad(): void {
    this.trazabilidadService.obtenerTrazabilidad().subscribe({
      next: (data) => {
        this.trazabilidad = data;
      },
      error: (err) => {
        console.error('Error al cargar trazabilidad', err);
      }
    });
  }

  confirmDelete(id: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trazabilidadService.eliminarTrazabilidad(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Registro eliminado con éxito.', 'success');
            this.cargarTrazabilidad();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
          }
        });
      }
    });
  }

  get trazabilidadFiltrada(): Trazabilidad[] {
    return this.trazabilidad.filter(t =>
      t.numDocumento.toString().includes(this.filtro) ||
      t.usuarionuevo.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
  
}
