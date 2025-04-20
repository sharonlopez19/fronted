import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContratosService, Contratos } from '../../../services/contratos.service';
import { AuthService } from '../../../services/auth.service';
import { MenuComponent } from '../../menu/menu.component';
import Swal from 'sweetalert2';
import { Route } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterNombre } from './filter-nombre'; 



@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent,NgxPaginationModule,FilterNombre],
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit{
  contratos: Contratos[] = [];
  filtroNombre: string ="";
  currentPage = 1;
  itemsPerPage = 5;
  nacionalidades: any[] = [];
  tipoContratoId: any[] = [];
  numDocumento: any[] = [];
  totalPages=5;
 
  contratoSeleccionado: Contratos = {
    numDocumento: 0, // ✅ ahora está correcto
    tipoContratoId: 1,
    estado: 1,
    fechaIngreso: '',
    fechaFinal: '',
    documento: ''
  };

  contrato: any = {}; // contrato logueado desde localStorage
  usuario:any={};
  nuevocontrato: any = {};
  constructor(private contratosService: ContratosService) {}

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('usuario logueado:', this.usuario);
    }
    this.contratosService.obtenerContratos().subscribe({
      next: (data) => {
        this.contratos = data; // 👈 ahora es un solo objeto
        console.log('contrato cargado:', this.contratos);
      }
    });
  }

  cargarContratos(): void {
    this.contratosService.obtenerContratos().subscribe({
      next: (data) => {
        this.contratos = data;
        console.log('contratos cargados:', this.contratos);
      },
      error: (err) => {
        console.error('Error al cargar contratos', err);
      }
    });
  }

  editarContrato(contrato: any, i: number) {
    this.contratoSeleccionado = { ...contrato };
  }
  

  

  confirmDelete(index: number): void {
    const contrato = this.contratos[index];
  
    this.contratosService.obtenerUsuarioPorDocumento(contrato.numDocumento).subscribe({
      next: (usuario) => {
        const nombre = `${usuario.primerNombre} ${usuario.primerApellido}`; // ajusta según tu estructura
  
        Swal.fire({
          title: `¿Eliminar a ${nombre}?`,
          text: 'Esta acción no se puede deshacer.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.contratosService.eliminarContrato(contrato.numDocumento).subscribe({
              next: () => {
                Swal.fire({
                  title: 'Eliminado',
                  text: `${nombre} fue eliminado correctamente.`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  location.reload();
                });
              },
              error: (err) => {
                console.error('Error al eliminar:', err);
                Swal.fire('Error', 'No se pudo eliminar el contrato.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('No se pudo obtener el nombre del usuario:', err);
        Swal.fire('Error', 'No se pudo obtener la información del contrato.', 'error');
      }
    });
  }
  
  
  
  get contratosPaginados(): Contratos[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.contratos.slice(start, start + this.itemsPerPage);
  }
  
  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }
  agregarContrato(): void {
    const contratoABase = {
      idContrato: this.nuevocontrato.idCOntrato,
      numDocumento: this.nuevocontrato.numDocumento,
      tipoContratoId: this.nuevocontrato.tipoContratoId,
      estado: this.nuevocontrato.estado,
      fechaIngreso: this.nuevocontrato.fechaIngreso,
      fechaFinal: this.nuevocontrato.fechaFinal,
      documento: this.nuevocontrato.documento,

    };
  
    console.log('contrato a guardar:', contratoABase);
  
    // Simulamos el guardado
    this.contratos.push(contratoABase);
    this.nuevocontrato = {}; // limpiar formulario
    this.contratosService.agregarContrato(contratoABase).subscribe({
      next: (res: Contratos) => {
        console.log('Guardado en base de datos:', res);
        this.contratos.push(res); // opcional si el backend devuelve el contrato guardado
        Swal.fire('¡Agregado!', 'El contrato ha sido guardado correctamente.', 'success');
        this.nuevocontrato = {};
      },
      error: (err) => {
        console.error('Error al guardar en base de datos:', err);
        Swal.fire('Error', 'No se pudo guardar el contrato.', 'error');
      }
    });
  
    
  }
  actualizarContrato(): void {
    if (!this.contratoSeleccionado || !this.contratoSeleccionado.numDocumento) return;
  
    this.contratosService.actualizarContratoParcial(this.contratoSeleccionado.numDocumento, this.contratoSeleccionado).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El contrato fue editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          location.reload(); // 👈 recarga la página cuando se cierre el alert
        });
  
        // Si querés actualizar la tabla:
        const index = this.contratos.findIndex(u => u.numDocumento === this.contratoSeleccionado.numDocumento);
        if (index !== -1) {
          this.contratos[index] = { ...this.contratoSeleccionado };
        }
      },
      error: (err) => {
        console.error('Error al actualizar contrato:', err);
        Swal.fire('Error', 'No se pudo actualizar el contrato.', 'error');
      }
    });
  }
  abrirModalAgregar(): void {
    this.nuevocontrato = {
      numDocumento: '',
      tipoContratoId: '',
      estado: '',
      fechaIngreso: '',
      fechaFinal: '',
      documento: ''
    };
  }
  
}
