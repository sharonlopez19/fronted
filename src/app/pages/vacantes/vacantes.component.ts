import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Component } from '@angular/core'; // Eliminado ElementRef y ViewChild
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [CommonModule, MenuComponent, FormsModule],
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss']
})
export class VacantesComponent {
  vacantes = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend Angular',
      salario: '$8,000,000 COP',
      descripcion: 'Buscamos un desarrollador Frontend con experiencia en Angular.',
      requisitos: [
        '3+ años de experiencia con Angular',
        'HTML5, CSS3, JavaScript',
        'Git',
        'Trabajo en equipo',
        'Inglés intermedio'
      ],
      imagen: 'https://victorroblesweb.es/wp-content/uploads/2017/04/angular4.png'
    },
    {
      id: 2,
      titulo: 'Diseñador UX/UI',
      salario: '$5,500,000 COP',
      descripcion: 'Diseña experiencias intuitivas y visualmente atractivas.',
      requisitos: [
        'Adobe XD, Figma',
        'Prototipado rápido',
        'Investigación de usuario',
        'Trabajo colaborativo'
      ],
      imagen: 'https://weareshifta.com/wp-content/uploads/diseno-ux-1.jpg'
    }
  ];

  // Se inicializa con la primera vacante o un objeto vacío si el arreglo puede estar vacío
  vacanteSeleccionada: any = this.vacantes.length > 0 ? this.vacantes[0] : {};

  seleccionarVacante(vacante: any): void {
    this.vacanteSeleccionada = vacante;
  }

  // Nueva función para manejar la postulación
  postularme(): void {
    // Aquí puedes implementar la lógica para postular al usuario a la vacante seleccionada.
    // Esto podría implicar:
    // 1. Navegar a una página o modal de formulario de postulación.
    // 2. Mostrar un mensaje de confirmación.
    // 3. Enviar una solicitud a un servicio backend para registrar la postulación.
    console.log('El usuario quiere postularse a:', this.vacanteSeleccionada.titulo);
    // Ejemplo: Puedes agregar lógica para abrir un modal de confirmación o formulario aquí
    // o llamar a un servicio:
    // this.postulacionService.enviarPostulacion(this.vacanteSeleccionada.id).subscribe(...);
  }

  // Funciones eliminarVacante, abrirModalAgregar y editarVacante han sido eliminadas
  // ya que no se llaman desde el HTML modificado.
}