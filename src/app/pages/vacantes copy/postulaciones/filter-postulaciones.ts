import { Pipe, PipeTransform } from '@angular/core';
// Importa la interfaz Postulacion desde donde la tengas definida
// Si la definiste en postulaciones.component.ts y la exportaste, la ruta sería:
import { Postulacion } from './postulaciones.component';

@Pipe({
  name: 'filterPostulacion', // Este es el nombre que usas en el HTML: | filterPostulacion
  standalone: true // O false, dependiendo de cómo configuraste tu Pipe
})
export class FilterPostulacionPipe implements PipeTransform {

  /**
   * Transforma una lista de postulaciones basándose en un término de búsqueda,
   * buscando principalmente en el Vacante Id.
   * @param postulaciones La lista completa de postulaciones.
   * @param termino El texto que se escribió en la barra de búsqueda.
   * @returns Un nuevo array con las postulaciones que coinciden con el término.
   */
  transform(postulaciones: Postulacion[], termino: string): Postulacion[] {
    // Si no hay postulaciones o no hay término de búsqueda, devuelve la lista completa
    if (!postulaciones || !termino) {
      return postulaciones;
    }

    // Convierte el término de búsqueda a minúsculas
    const lowerTermino = termino.toLowerCase();

    // Filtra la lista de postulaciones
    return postulaciones.filter(postulacion =>
      // Convierte el vacanteId a string y luego a minúsculas para buscar si incluye el término
      // Asegúrate de que postulacion.vacanteId exista y sea un número o string
      (postulacion.vacanteId ? postulacion.vacanteId.toString().includes(lowerTermino) : false)
      // Puedes añadir otras propiedades para buscar si quieres, por ejemplo el ID de postulación:
      // || (postulacion.id ? postulacion.id.toString().includes(lowerTermino) : false)
      // O el estado:
      // || (postulacion.estado ? postulacion.estado.toLowerCase().includes(lowerTermino) : false)
    );
  }
}