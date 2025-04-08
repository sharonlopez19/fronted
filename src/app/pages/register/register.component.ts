import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necesario para *ngFor y *ngIf

@Component({
  selector: 'app-register',
  standalone: true, // ✅ Indica que es standalone
  imports: [CommonModule], // ✅ Importamos CommonModule para usar *ngFor y *ngIf
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  vacantes = [
    {
      titulo: 'Desarrollador Frontend',
      salario: '$1,200 USD',
      descripcion: 'Responsable del desarrollo de interfaces modernas con Angular.',
      requisitos: ['HTML', 'CSS', 'JavaScript', 'Angular'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png'
    },
    {
      titulo: 'Diseñador UI/UX',
      salario: '$1,000 USD',
      descripcion: 'Diseño de experiencias e interfaces intuitivas.',
      requisitos: ['Figma', 'Sketch', 'Prototipado'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    {
      titulo: 'Backend Node.js',
      salario: '$1,500 USD',
      descripcion: 'Desarrollo y mantenimiento de APIs RESTful.',
      requisitos: ['Node.js', 'Express', 'MongoDB'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/2721/2721298.png'
    },
    {
      titulo: 'QA Tester',
      salario: '$900 USD',
      descripcion: 'Ejecución de pruebas manuales y automatizadas.',
      requisitos: ['Postman', 'Selenium', 'Cypress'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/921/921347.png'
    },
    {
      titulo: 'Scrum Master',
      salario: '$1,800 USD',
      descripcion: 'Facilitador de equipos en entornos ágiles.',
      requisitos: ['Scrum', 'Kanban', 'Gestión de equipos'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/190/190411.png'
    },
    {
      titulo: 'Administrador de Base de Datos',
      salario: '$1,400 USD',
      descripcion: 'Mantenimiento y optimización de bases de datos SQL y NoSQL.',
      requisitos: ['SQL', 'MySQL', 'MongoDB'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/4299/4299956.png'
    },
    {
      titulo: 'DevOps Engineer',
      salario: '$2,000 USD',
      descripcion: 'Implementación de CI/CD y administración en la nube.',
      requisitos: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      imagen: 'https://cdn-icons-png.flaticon.com/512/2721/2721299.png'
    }
  ];

  vacanteSeleccionada: any = null;

  seleccionarVacante(vacante: any): void {
    this.vacanteSeleccionada = vacante;
  }
}
