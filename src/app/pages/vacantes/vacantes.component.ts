// src/app/components/vacantes/vacantes.component.ts
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Component, OnInit } from '@angular/core'; // <<<< IMPORTAR OnInit aquí
import { FormsModule } from '@angular/forms';

// <<<< IMPORTAR el servicio y la interfaz Vacante >>>>
import { VacantesService, Vacante } from '../../services/vacantes.service';
import { catchError } from 'rxjs/operators'; // <<<< IMPORTAR catchError para manejo de errores
import { of } from 'rxjs'; // <<<< IMPORTAR 'of' para retornar un observable en caso de error


@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [CommonModule, MenuComponent, FormsModule],
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss']
})
export class VacantesComponent implements OnInit { // <<<< IMPLEMENTAR OnInit aquí
  // Inicializamos como un arreglo vacío. Los datos vendrán de la API.
  vacantes: Vacante[] = []; // <<<< Usamos la interfaz Vacante para tipar
  vacanteSeleccionada: Vacante | any = {}; // Puede ser Vacante o un objeto vacío

  // Bandera para mostrar un mensaje si ocurre un error al cargar
  errorCargandoVacantes: boolean = false;

  // <<<< INYECTAR el VacantesService en el constructor >>>>
  constructor(private vacantesService: VacantesService) {
    // La lógica de carga ahora va en ngOnInit
  }

  // <<<< IMPLEMENTAR ngOnInit - se ejecuta al inicializar el componente >>>>
  ngOnInit(): void {
    this.cargarVacantes(); // Llamamos al método que carga las vacantes
  }

  // <<<< MÉTODO para cargar las vacantes desde el servicio >>>>
  cargarVacantes(): void {
    this.vacantesService.getVacantes() // Llama al método del servicio
      .pipe(
         // <<<< MANEJO DE ERRORES >>>>
         // Si ocurre un error en la petición, catchError lo intercepta.
         // Registramos el error y retornamos un Observable vacío
        catchError(error => {
          console.error('Error al cargar las vacantes:', error);
          this.errorCargandoVacantes = true; // Activamos la bandera de error
          // Retornamos un Observable de un arreglo vacío para que el 'subscribe'
          // no falle y la aplicación no se rompa.
          return of([]);
        })
      )
      .subscribe(
        // <<<< SUSCRIPCIÓN - se ejecuta cuando la petición es exitosa o catchError retornó algo >>>>
        (data: Vacante[]) => {
          this.vacantes = data; // Asigna los datos recibidos al arreglo 'vacantes'
          // console.log('Vacantes cargadas exitosamente:', this.vacantes); // Línea para depuración

          // Seleccionar la primera vacante por defecto si hay alguna
          if (this.vacantes.length > 0) {
            this.vacanteSeleccionada = this.vacantes[0];
          } else {
            this.vacanteSeleccionada = {}; // O dejar vacía si no hay vacantes
          }
          this.errorCargandoVacantes = false; // Asegurarse de que el flag de error esté falso si tuvo éxito
        }
        // Ya no necesitamos el bloque de error en subscribe si usamos catchError
        // complete: () => { console.log('Carga de vacantes finalizada (sea éxito o error manejado)'); } // Opcional
      );
  }


  // Este método permanece igual
  seleccionarVacante(vacante: Vacante): void {
    this.vacanteSeleccionada = vacante;
  }

  // Este método permanece igual
  postularme(): void {
    console.log('El usuario quiere postularse a:', this.vacanteSeleccionada.titulo);
    // ... tu lógica actual para postularse (abrir modal, etc.) ...
  }

  // Funciones eliminarVacante, abrirModalAgregar y editarVacante (si existían)
  // ...
}