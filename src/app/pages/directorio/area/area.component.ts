import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterNamePipe } from 'src/app/shared/filter-name.pipe';
import { Areas, AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-area',
  imports: [CommonModule, FormsModule, MenuComponent,NgxPaginationModule,FilterNamePipe],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent {
  areas: Areas[]=[];
  filtroNombre:string="";
  area: any = {};
  currentPage = 1;
  itemsPerPage = 5;
  totalPages=5;
  usuario:any={};
  areaSeleccionada: Areas = {
    idArea: 0,
    nombreArea: "",         
    jefePersonal: "",
    estado: 0
  };
  constructor(private areaService: AreaService,private authService: AuthService) {}
  ngOnInit(): void {
    const userFromLocal = localStorage.getItem('usuario');
    if (userFromLocal) {
      this.usuario = JSON.parse(userFromLocal);
      console.log('usuario logueado:', this.usuario);
    }
    this.areaService.obtenerAreas().subscribe({
      next: (data) => {
        this.areas = data; 
        this.totalPages = Math.ceil(this.areas.length / this.itemsPerPage);
        console.log('area cargada:', this.areas);
      }
    });
    
  }
  confirmDelete(idArea: number): void {
    this.areaService.obtenerAreaId(idArea).subscribe({
      next: (res) => {
        const areaData = res.area; // ← correcto según tu backend
        if (!areaData) {
          Swal.fire('Error', 'No se encontró información del área.', 'error');
          return;
        }
  
        Swal.fire({
          title: `¿Eliminar el área "${areaData.nombreArea}"?`,
          text: 'Esta acción no se puede deshacer.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.areaService.eliminarAreaId(areaData.idArea).subscribe({
              next: () => {
                Swal.fire({
                  title: 'Eliminado',
                  text: `${areaData.nombreArea} fue eliminado correctamente.`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  location.reload(); // o this.cargarAreas();
                });
              },
              error: (err) => {
                console.error('Error al eliminar el área:', err);
                Swal.fire('Error', 'No se pudo eliminar el área.', 'error');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al buscar el área:', err);
        Swal.fire('Error', 'No se pudo obtener la información del área.', 'error');
      }
    });
  }
  
  
    get areasPaginados(): Areas[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.areas.slice(start, start + this.itemsPerPage);
      }
      
      cambiarPagina(pagina: number): void {
        if (pagina >= 1 && pagina <= this.totalPages) {
          this.currentPage = pagina;
        }
      }
      agregarArea(): void {
        // Verifica primero si el usuario existe
        this.areaService.obtenerNombre(this.areaSeleccionada.nombreArea).subscribe({
          next: (res) => {
            const formData = new FormData();
            formData.append('nombreArea', this.areaSeleccionada.nombreArea.toString());
            formData.append('jefePersonal', this.areaSeleccionada.nombreArea);
        
            formData.append('estado', this.areaSeleccionada.estado.toString());

            this.areaService.agregarArea(formData).subscribe({
              next: () => {
                Swal.fire({
                  title: '¡OK!',
                  text: `El area para ${this.areaSeleccionada.nombreArea} fue creado exitosamente.`,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  location.reload(); // o this.cargarareas() si no quieres recargar
                });
              },
              error: (err) => {
                console.error('Error al guardar:', err);
                Swal.fire('¡ERROR!', 'No se pudo crear el area.', 'error');
              }
            });
          },
          error: (err) => {
            console.error('Error al buscar el area:', err);
            Swal.fire('Error', 'No se encontró el area. Verifique por nombre.', 'error');
          }
        });
      }
      abrirModalAgregar(): void {
        this.areaSeleccionada = {
          idArea: 0,
          nombreArea: '',
          jefePersonal: '',
          estado: 1
        };
      }
      editarArea(area: any) {
        
        this.areaSeleccionada = { ...area };
      }
      actualizarArea(): void {
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('idArea', this.areaSeleccionada.idArea.toString());
        formData.append('nombreArea', this.areaSeleccionada.nombreArea);
        formData.append('jefePersonal', this.areaSeleccionada.jefePersonal);
        formData.append('estado', this.areaSeleccionada.estado.toString());
      
        this.areaService.actualizarAreaParcial(this.areaSeleccionada.idArea, formData).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'El área fue editada exitosamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              location.reload(); // o this.cargarAreas();
            });
      
            const index = this.areas.findIndex(a => a.idArea === this.areaSeleccionada.idArea);
            if (index !== -1) {
              this.areas[index] = { ...this.areaSeleccionada };
            }
          },
          error: (err) => {
            console.error('Error al actualizar área:', err);
            Swal.fire({
              title: '¡Error!',
              text: 'No se pudo actualizar el área.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      }
      
      getNombreEstado(estado: number): string {
        switch (estado) {
          case 1: return 'Activo';
          case 2: return 'Inactivo';
          case 3: return 'Suspendido';
          default: return 'Desconocido';
        }
      }
      
      getClaseEstado(estado: number): string {
        switch (estado) {
          case 1: return 'badge bg-success';
          case 2: return 'badge bg-warning text-dark';
          case 3: return 'badge bg-danger';
          default: return 'badge bg-secondary';
        }
      }
      
}
