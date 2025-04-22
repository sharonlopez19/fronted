import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../../../services/categoria.service';

@Pipe({
  name: 'filterCategoria',
  standalone: true
})
export class FilterCategoriaPipe implements PipeTransform {

  transform(categorias: Categoria[], filtroNombre: string): Categoria[] {
    if (!filtroNombre) {
      return categorias;
    }

    const filtroLower = filtroNombre.toLowerCase();

    return categorias.filter(categoria =>
      categoria.nomCategoria.toLowerCase().includes(filtroLower)
    );
  }

}
