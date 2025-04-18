import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';

// Definimos la interfaz para los datos de vacaciones
interface VacacionItem {
  id: number;
  nombre: string;
  cargo: string;
  estado: 'Completado' | 'Rechazado' | 'Pendiente';
  fechaInicio: string;
  fechaFin: string;
  isExpanded?: boolean; // Propiedad para el estado del acordeón
}

// Definimos las columnas para usar como etiquetas en el acordeón
interface ColumnHeader {
    key: keyof VacacionItem | 'accion';
    label: string;
}


@Component({
  selector: 'app-vacaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit, OnDestroy {

  vacaciones: VacacionItem[] = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', estado: 'Completado', fechaInicio: '15/07/24', fechaFin: '19/12/24', isExpanded: false },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', estado: 'Rechazado', fechaInicio: '17/07/24', fechaFin: '03/08/24', isExpanded: false }
  ];

  columnHeaders: ColumnHeader[] = [
    // No incluimos 'nombre' aquí si solo queremos mostrarlo en el header del acordeón
    { key: 'cargo', label: 'Cargo' },
    { key: 'estado', label: 'Estado' },
    { key: 'fechaInicio', label: 'Fecha Inicio' },
    { key: 'fechaFin', label: 'Fecha Final' },
    { key: 'accion', label: 'Acción' } // Columna especial para las acciones
  ];


  vacacionEditada: any = {};
  nuevaVacacion: any = { estado: 'Pendiente', isExpanded: false };
  mostrarAgregarModal: boolean = false;

  isLargeScreen: boolean = true;
  private breakpoint: number = 1045;

  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
      // @HostListener('window:resize') no necesita desuscripción manual
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isLargeScreen = window.innerWidth > this.breakpoint;
    
    if (!this.isLargeScreen) { // Colapsar solo si pasa a pantalla pequeña
        // No colapsar automáticamente al redimensionar en pantalla pequeña
        // Si quieres que siempre se colapsen al cambiar a grande, la lógica está en el subscribe de BreakpointObserver (versión previa)
        // Con HostListener, podrías colapsar solo al pasar *de* pequeña *a* grande.
        // Por simplicidad con HostListener, mantengamos los acordeones abiertos al redimensionar en pequeño.
    } else { // Si pasa a pantalla grande, colapsar todos los acordeones
        this.vacaciones.forEach(item => item.isExpanded = false);
    }
  }


  // --- Métodos existentes (se mantienen) ---

  agregarVacacion(): void {
    this.nuevaVacacion = { estado: 'Pendiente', isExpanded: false };
    this.mostrarAgregarModal = true;
    const modal = document.getElementById('agregarModal') as HTMLElement;
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  editarVacacion(vacacion: VacacionItem): void {
    this.vacacionEditada = { ...vacacion };
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  guardarNuevaVacacion(): void {
    if (this.nuevaVacacion.nombre && this.nuevaVacacion.cargo && this.nuevaVacacion.fechaInicio && this.nuevaVacacion.fechaFin && this.nuevaVacacion.estado) {
      const nuevoId = this.vacaciones.length > 0 ? Math.max(...this.vacaciones.map(v => v.id)) + 1 : 1;
      const vacacionToAdd: VacacionItem = { id: nuevoId, ...this.nuevaVacacion, isExpanded: false };
      this.vacaciones = [...this.vacaciones, vacacionToAdd];
      this.cerrarAgregarModal();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  guardarEdicion(): void {
    const index = this.vacaciones.findIndex(v => v.id === this.vacacionEditada.id);
    if (index !== -1) {
      this.vacaciones[index] = { ...this.vacacionEditada, isExpanded: this.vacaciones[index].isExpanded };
    }
    this.cerrarModalEditar();
  }

  cerrarModalEditar(): void {
    const modal = document.getElementById('editModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
  }

  cerrarAgregarModal(): void {
    this.mostrarAgregarModal = false;
    const modal = document.getElementById('agregarModal') as HTMLElement;
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    this.nuevaVacacion = { estado: 'Pendiente', isExpanded: false };
  }

  eliminarVacacion(id: number): void {
    const confirmado = confirm('¿Estás seguro de que deseas eliminar esta vacación?');
    if (confirmado) {
      this.vacaciones = this.vacaciones.filter(v => v.id !== id);
    }
  }

  generarReporte(): void {
    alert('Generando reporte de vacaciones...');
  }

  // --- Lógica para el acordeón (simplificada) ---

  toggleAccordion(item: VacacionItem): void {
      this.vacaciones.forEach(v => {
          if (v !== item && v.isExpanded) {
              v.isExpanded = false;
          }
      });
      item.isExpanded = !item.isExpanded;
  }

  // === CORRECCIÓN: Método para obtener el valor ===
  // Ahora recibe item y la clave (string) y accede a la propiedad dentro del TS.
   getDataPropertyValue(item: VacacionItem, key: string): any {
       // Usamos 'in item' para comprobar si la clave existe en el objeto item
       // Usamos 'as keyof VacacionItem' para decirle a TypeScript que 'key' debería ser una clave de VacacionItem
       // aunque viene como string, es seguro aquí porque sabemos que las claves de columnHeaders vienen de VacacionItem (o es 'accion')
       if (key === 'accion') {
           // Manejamos la clave 'accion' por separado si es necesario, aunque en HTML se renderizan botones
           return null; // O undefined, o un string vacío, ya que el HTML maneja los botones
       }
       if (item && typeof item === 'object' && key in item) {
           return item[key as keyof VacacionItem];
       }
       return undefined; // Retorna undefined si la clave no existe (aunque con nuestras columnHeaders no debería pasar para keys != 'accion')
   }


  // Método para obtener la clase del badge (se mantiene)
  getEstadoBadgeClass(estado: VacacionItem['estado']): string {
      switch(estado) {
          case 'Completado': return 'badge-complete';
          case 'Rechazado': return 'badge-rechazado';
          case 'Pendiente': return 'badge-pendiente';
          default: return '';
      }
  }
}

