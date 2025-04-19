import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuarios } from '../../../services/usuarios.service';
import { AuthService } from '../../../services/auth.service';
import { MenuComponent } from '../../menu/menu.component';
import Swal from 'sweetalert2';
import { Route } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterNombre } from './filter-nombre'; 


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent,NgxPaginationModule,FilterNombre],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[] = [];
  filtroNombre: string ="";
  currentPage = 1;
  itemsPerPage = 5;
  nacionalidades: any[] = [];
  eps: any[] = [];
  generos: any[] = [];
  tiposDocumento: any[] = [];
  estadosCiviles: any[] = [];
  pensiones: any[] = [];
  totalPages=5;
 

  usuarioSeleccionado: Usuarios = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    email: '',
    password:"",
    direccion: '',
    numDocumento: 0,
    nacionalidadId: null,
    epsCodigo: '',
    generoId: null,
    tipoDocumentoId: null,
    estadoCivilId: null,
    pensionesCodigo: ''
  };

  usuario: any = {}; // usuario logueado desde localStorage
  nuevoUsuario: any = {};
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('Usuario logueado:', this.usuario);
    }
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data; // 👈 ahora es un solo objeto
        console.log('Usuario cargado:', this.usuarios);
      }
    });
  }

  cargarUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }

  nombreCompleto(usuarios: Usuarios): string {
    return `${usuarios.primerNombre} ${usuarios.segundoNombre} ${usuarios.primerApellido} ${usuarios.segundoApellido}`;
  }

  editarusuarios(usuario: Usuarios, index: number): void {
    this.usuarioSeleccionado = { ...usuario };
  }

  

  confirmDelete(index: number): void {
    const usuario = this.usuarios[index];
    const nombre = `${usuario.primerNombre} ${usuario.primerApellido}`;
  
    Swal.fire({
      title: `¿Eliminar a ${nombre}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(usuario.numDocumento).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Eliminado',
              text: `${nombre} fue eliminado correctamente.`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              location.reload(); // ✅ recargar página después
            });
          },
          error: (err) => {
            console.error('Error al eliminar:', err);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });
  }
  
  
  get usuariosPaginados(): Usuarios[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.usuarios.slice(start, start + this.itemsPerPage);
  }
  
  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }
  agregarUsuario(): void {
    const usuarioABase = {
      numDocumento: this.nuevoUsuario.numDocumento,
      primerNombre: this.nuevoUsuario.primerNombre,
      segundoNombre: this.nuevoUsuario.segundoNombre,
      primerApellido: this.nuevoUsuario.primerApellido,
      segundoApellido: this.nuevoUsuario.segundoApellido,
      email: this.nuevoUsuario.email,
      direccion: this.nuevoUsuario.direccion,
      telefono: this.nuevoUsuario.telefono,

      password: '123456', // valor temporal
      fechaNac: '2000-01-01',
      numHijos: 0,
      contactoEmergencia: 'LLENAR CAMPO',
      numContactoEmergencia: '0000000000',
      nacionalidadId: 1,
      epsCodigo: "EPS001",
      generoId: 1,
      tipoDocumentoId: 1,
      estadoCivilId: 1,
      pensionesCodigo: "230301",
      usersId: this.usuario?.id || 1
    };
  
    console.log('Usuario a guardar:', usuarioABase);
  
    // Simulamos el guardado
    this.usuarios.push(usuarioABase);
    this.nuevoUsuario = {}; // limpiar formulario
    this.usuariosService.agregarUsuario(usuarioABase).subscribe({
      next: (res: Usuarios) => {
        console.log('Guardado en base de datos:', res);
        this.usuarios.push(res); // opcional si el backend devuelve el usuario guardado
        Swal.fire('¡Agregado!', 'El usuario ha sido guardado correctamente.', 'success');
        this.nuevoUsuario = {};
      },
      error: (err) => {
        console.error('Error al guardar en base de datos:', err);
        Swal.fire('Error', 'No se pudo guardar el usuario.', 'error');
      }
    });
  
    
  }
  actualizarUsuario(): void {
    if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.numDocumento) return;
  
    this.usuariosService.actualizarUsuarioParcial(this.usuarioSeleccionado.numDocumento, this.usuarioSeleccionado).subscribe({
      next: (res) => {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El usuario fue editado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          location.reload(); // 👈 recarga la página cuando se cierre el alert
        });
  
        // Si querés actualizar la tabla:
        const index = this.usuarios.findIndex(u => u.numDocumento === this.usuarioSeleccionado.numDocumento);
        if (index !== -1) {
          this.usuarios[index] = { ...this.usuarioSeleccionado };
        }
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
      }
    });
  }
  
}
