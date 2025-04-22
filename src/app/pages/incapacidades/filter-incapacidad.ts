// En tu archivo: src/app/pages/vacantes copy/gestion/filter-gestion.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Incapacidad } from 'src/app/services/incapacidades.service';
// Importa la Interfaz Vacante (que DEBE tener 'nomVacante', 'idVacantes', etc.)

@Pipe({
  name: 'filterIncapacidad', // Nombre que usas en el HTML
  standalone: true
})
export class FilterIncapacidad implements PipeTransform {

  transform(incapacidad: Incapacidad[] | null | undefined, filtro: string): Incapacidad[] {
    // Maneja input null/undefined o filtro vacío
    if (!incapacidad || !filtro) {
      return incapacidad || [];
    }

    const lowerCaseFiltro = filtro.toLowerCase();

    // *** LÓGICA DE FILTRADO CORREGIDA: Ahora usa 'nomVacante' y elimina 'codigo' ***
    return incapacidad.filter(incapacidad => {
       // Filtra solo por el NUEVO nombre de la vacante: nomVacante
       // Usamos ?. para acceso seguro si nomVacante pudiera ser null/undefined en los datos
       return incapacidad.fechaInicio;

       // Si quieres filtrar por otros campos de la imagen (ej: descripVacante, cargoVacante), añádelos así:
       // return vacante.nomVacante?.toLowerCase().includes(lowerCaseFiltro) ||
       //        vacante.descripVacante?.toLowerCase().includes(lowerCaseFiltro) ||
       //        vacante.cargoVacante?.toLowerCase().includes(lowerCaseFiltro);

       // Si por alguna razón 'codigo' sigue siendo relevante en tus datos y quieres buscar por él
       // bajo otro nombre (ej: si se mapea a 'idVacantes' o algo así), tendrías que ajustar aquí.
       // Pero basándonos en la imagen, 'nomVacante' es el nombre de la vacante.
    });
    // *** FIN LÓGICA DE FILTRADO CORREGIDA ***
  }
}