import { Component, OnInit, HostListener } from '@angular/core'; // Importa OnInit y HostListener
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importa FontAwesomeModule si usas íconos

interface HoraExtra {
  id: number;
  nombre: string;
  cargo: string;
  fecha: string;
  horaInicio: string;
  horaFinal: string;
  totalHoras: number;
  estado: string;
  isExpanded?: boolean; // Añadimos esta propiedad para el acordeón
}

@Component({
  selector: 'app-horas-extra',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent, FontAwesomeModule], // Añade FontAwesomeModule si no estaba
  templateUrl: './horas-extra.component.html',
  styleUrls: ['./horas-extra.component.scss']
})
export class HorasExtraComponent implements OnInit { // Implementa OnInit
  horasExtras: HoraExtra[] = [
    { id: 1, nombre: 'John Michael', cargo: 'Asesor', fecha: '2024-07-15', horaInicio: '17:00', horaFinal: '20:00', totalHoras: 3, estado: 'completado' },
    { id: 2, nombre: 'Laurent Perrier', cargo: 'Programador', fecha: '2024-07-17', horaInicio: '18:00', horaFinal: '22:00', totalHoras: 4, estado: 'pendiente' }
  ];

  modalVisible: boolean = false; // Controla el modal de Editar
  horaExtraEditada: HoraExtra = {} as HoraExtra;
  nuevaHoraExtra: HoraExtra = {} as HoraExtra; // Variable para el modal de Agregar

  // Corregido el nombre de esta propiedad para que sea coherente
  mostrarAgregarModalHorasExtra: boolean = false; // Controla el modal de Agregar

  // Propiedad para controlar la vista (tabla vs acordeón)
  isLargeScreen: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Inicializa isExpanded para cada elemento y verifica el tamaño inicial de la pantalla
    this.horasExtras = this.horasExtras.map(item => ({
      ...item,
      isExpanded: false // Asegúrate de que todos empiezan cerrados
    }));
    this.onResize(); // Llamar al inicio para establecer el estado inicial

    // Convertir fechas string a objetos Date si es necesario para el date pipe,
    // o manejar el formato de fecha directamente en los inputs del modal si son de tipo 'date'
    // Si los inputs de fecha en los modales son tipo="date", espera un string 'YYYY-MM-DD'
    // Si tu data original viene en otro formato, necesitarás adaptarla.
    // El pipe 'date' en el HTML funciona bien con strings 'YYYY-MM-DD' o Date objects.
  }

  // Listener para detectar cambios en el tamaño de la ventana
  @HostListener('window:resize', [])
  onResize() {
    // Define el breakpoint donde cambia de tabla a acordeón
    // 1045px fue el usado en incapacidades, puedes ajustarlo si quieres
    this.isLargeScreen = window.innerWidth > 1045;
  }

  // Método para desplegar/contraer un elemento del acordeón
  toggleAcordeon(item: HoraExtra): void {
    item.isExpanded = !item.isExpanded;
  }


  // --- Funciones para Agregar Horas Extras ---
  agregarHorasExtras(): void {
    this.nuevaHoraExtra = {} as HoraExtra; // Reinicia el objeto para el nuevo registro
    // Cambiado a la propiedad correcta
    this.mostrarAgregarModalHorasExtra = true;

    // Si usas Bootstrap JS para abrir modales (en lugar de [ngStyle]/[ngClass]),
    // necesitarías @ViewChild y llamar a .show() aquí.
    // Como pediste mantener los modales "tal cual", sigo con el enfoque de propiedades booleanas.
  }

  // Corregido el nombre de la función para cerrar el modal de Agregar
  cerrarAgregarModalHorasExtra(): void {
    // Cambiado a la propiedad correcta
    this.mostrarAgregarModalHorasExtra = false;
     this.nuevaHoraExtra = {} as HoraExtra; // Limpiar el formulario al cerrar
  }

  // Corregido el nombre de la función para guardar el nuevo registro
  guardarNuevaHoraExtra(): void {
     // Aquí añadirías lógica de validación si es necesaria

     // Asigna un ID (ejemplo simple, usa un servicio real en producción)
     const nuevoId = this.horasExtras.length > 0 ? Math.max(...this.horasExtras.map(h => h.id)) + 1 : 1;

     this.horasExtras.push({
       ...this.nuevaHoraExtra,
       id: nuevoId,
       isExpanded: false // Asegura que el nuevo elemento esté colapsado en el acordeón
      });

    // Cambiado a la función correcta para cerrar
    this.cerrarAgregarModalHorasExtra();
  }


  // --- Funciones para Editar Horas Extras ---
  editarHorasExtras(horaExtra: HoraExtra): void {
    // Clonar el objeto para no modificar directamente el original al editar
    this.horaExtraEditada = { ...horaExtra };
    this.modalVisible = true;

    // Si usas Bootstrap JS, aquí llamarías a .show() en el modal de editar.
  }

  cancelarEdicion(): void {
    this.modalVisible = false;
    // Opcional: podrías resetear horaExtraEditada aquí si no quieres conservar los cambios al cancelar
    // this.horaExtraEditada = {} as HoraExtra;
  }

  guardarEdicion(): void {
    // Aquí añadirías lógica de validación si es necesaria

    const index = this.horasExtras.findIndex(h => h.id === this.horaExtraEditada.id);
    if (index !== -1) {
      // Mantener el estado isExpanded original si existe, o false por defecto
      const originalIsExpanded = this.horasExtras[index].isExpanded;
      this.horasExtras[index] = {
        ...this.horaExtraEditada,
        isExpanded: originalIsExpanded // Mantiene el estado del acordeón
       };
    }
    this.modalVisible = false;

    // Opcional: podrías resetear horaExtraEditada aquí
    // this.horaExtraEditada = {} as HoraExtra;
  }

  // --- Funciones de Eliminar y Reporte ---
  eliminarHorasExtras(horaExtra: HoraExtra): void {
    const confirmado = confirm(`¿Estás seguro de eliminar las horas extras de ${horaExtra.nombre} (${horaExtra.fecha})?`);
    if (confirmado) {
      this.horasExtras = this.horasExtras.filter(h => h.id !== horaExtra.id);
    }
  }

  generarReporte(): void {
    // Lógica real para generar reporte
    console.log('Generando reporte de horas extras...');
    alert('Generando reporte de horas extras...'); // Mantengo tu alert original
  }
}