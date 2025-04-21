import { Pipe, PipeTransform } from '@angular/core';
// Importa la interfaz Categoria desde donde la tengas definida
import { Categoria } from './categoria-vacantes.component'; // <--- Asegúrate que esta ruta sea correcta si la interfaz no está en el TS del componente


@Pipe({
  name: 'filterCategoria', // Este nombre es crucial y DEBE coincidir con lo que pones en el HTML
  standalone: true // O 'false' si no usas standalone y lo declaraste en un módulo
})
export class FilterCategoriaPipe implements PipeTransform { // El nombre de la clase del Pipe

  transform(categorias: Categoria[], termino: string): Categoria[] {
    if (!categorias || !termino) {
      return categorias;
    }

    const lowerTermino = termino.toLowerCase();

    return categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(lowerTermino)
      // Puedes añadir || (categoria.id ? categoria.id.toString().includes(lowerTermino) : false) si quieres buscar por ID también
    );
  }
}