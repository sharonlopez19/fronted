import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVacacion',
  standalone: true
})
export class FilterVacacion implements PipeTransform {
  transform(lista: any[], texto: string): any[] {
    if (!lista) return [];
    if (!texto) return lista;
    texto = texto.toLowerCase();
    return lista.filter(item => item.descrip.toLowerCase().includes(texto));
  }
}
