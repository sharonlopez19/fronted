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
declare var bootstrap: any;



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
  archivoSeleccionado: File | null = null;
  tiposContrato: any[] = [];
  

  contratoSeleccionado: Contratos = {
    idContrato: 0,
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
    this.obtenerTiposContrato();
  }
  obtenerTiposContrato(): void {
    this.contratosService.obtenerTiposContrato().subscribe({
      next: (data) => {
        this.tiposContrato = data;
        console.log('Tipos de documento cargados:', this.tiposContrato);
      },
      error: (error) => {
        console.error('Error al cargar tipos de documento', error);
      }
    });
  }
  
  onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];

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
    const formData = new FormData();
  
    formData.append('numDocumento', this.contratoSeleccionado.numDocumento.toString());
    formData.append('tipoContratoId', this.contratoSeleccionado.tipoContratoId.toString());
    formData.append('estado', this.contratoSeleccionado.estado.toString());

    formData.append('fechaIngreso', this.contratoSeleccionado.fechaIngreso);
    formData.append('fechaFinal', this.contratoSeleccionado.fechaFinal);
  
    if (this.archivoSeleccionado) {
      formData.append('documento', this.archivoSeleccionado);
    }
  
    this.contratosService.agregarContrato(formData).subscribe({
      next: (res) => {
       Swal.fire({
                 title: '¡OK!',
                 text: 'El contrato fue creado exitosamente.',
                 icon: 'success',
                 confirmButtonText: 'Aceptar'
               }).then(() => {
                 location.reload(); // 👈 recarga la página cuando se cierre el alert
               });
        this.cargarContratos();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        Swal.fire({
                  title: '¡ERROR!',
                  text: 'El usuario no se pudo crear.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  location.reload(); // 👈 recarga la página cuando se cierre el alert
                });
      }
    });
  }
  imagenSeleccionada: string = '';
   

  abrirModalImagen(url: string) {
    this.imagenSeleccionada = 'http://localhost:8000/' + url;

    setTimeout(() => {
      const modalElement = document.getElementById('modalImagen');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
        document.getElementById('modalImagen');

      } else {
        console.error('Modal no encontrado en el DOM');
      }
    }, 200); // <-- prueba con 200ms
  }

  actualizarContrato(): void {

    const formData = new FormData();
  
    // Campos obligatorios o editables
    formData.append('_method', 'PATCH');
    formData.append('idContrato', this.contratoSeleccionado.idContrato.toString());
    formData.append('numDocumento', this.contratoSeleccionado.numDocumento.toString());
    formData.append('tipoContratoId', this.contratoSeleccionado.tipoContratoId.toString());
    formData.append('estado', this.contratoSeleccionado.estado.toString());
    formData.append('fechaIngreso', this.contratoSeleccionado.fechaIngreso);
    formData.append('fechaFinal', this.contratoSeleccionado.fechaFinal);
  
    // Archivo (si fue seleccionado)
    if (this.archivoSeleccionado) {
      formData.append('documento', this.archivoSeleccionado);
    }
    console.log('ID que se está enviando:', this.contratoSeleccionado.idContrato);

    this.contratosService.actualizarContratoParcial(this.contratoSeleccionado.idContrato, formData).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El contrato fue editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          location.reload(); // o this.cargarContratos(); si no querés recargar toda la página
        });
  
        const index = this.contratos.findIndex(c => c.numDocumento === this.contratoSeleccionado.numDocumento);
        if (index !== -1) {
          this.contratos[index] = { ...this.contratoSeleccionado };
        }
      },
      error: (err) => {
        console.error('Error al actualizar contrato:', err);
        Swal.fire({
          title: '¡Error!',
          text: 'Algo salió mal, no se pudo actualizar.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          location.reload(); // o this.cargarContratos(); si no querés recargar toda la página
        })
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
