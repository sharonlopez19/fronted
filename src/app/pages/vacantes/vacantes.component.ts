import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [CommonModule, MenuComponent],
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
    },
    {
      id: 3,
      titulo: 'Desarrollador Backend Python',
      salario: '$8,000,000 COP',
      descripcion: 'Responsable del desarrollo del backend con Django.',
      requisitos: [
        'Python 3, Django',
        'Bases de datos relacionales',
        'Docker y Git',
        'Experiencia en APIs REST'
      ],
      imagen: 'https://cdn-icons-png.flaticon.com/512/919/919852.png'
    },
    {
      id: 4,
      titulo: 'Ingeniero DevOps',
      salario: '$9,000,000 COP',
      descripcion: 'Implementa y administra pipelines de CI/CD y entornos en la nube.',
      requisitos: [
        'Experiencia con Jenkins, GitLab CI',
        'AWS / Azure',
        'Docker y Kubernetes',
        'Infraestructura como código'
      ],
      imagen: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png'
    },
    {
      id: 5,
      titulo: 'QA Tester',
      salario: '$4,800,000 COP',
      descripcion: 'Encargado de pruebas manuales y automatizadas en diversas plataformas.',
      requisitos: [
        'Selenium, Cypress',
        'Pruebas funcionales y de regresión',
        'Documentación clara',
        'Trabajo en equipo'
      ],
      imagen: 'https://cdn-icons-png.flaticon.com/512/4149/4149657.png'
    },
    {
      id: 6,
      titulo: 'Project Manager',
      salario: '$10,000,000 COP',
      descripcion: 'Lidera proyectos de desarrollo software y coordina equipos multidisciplinarios.',
      requisitos: [
        'Scrum / Agile',
        'Herramientas como Jira y Trello',
        'Excelentes habilidades de comunicación',
        'Gestión de riesgos'
      ],
      imagen: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
    },
    {
      id: 7,
      titulo: 'Ingeniero de Datos',
      salario: '$9,500,000 COP',
      descripcion: 'Diseña, construye y mantiene pipelines de datos escalables.',
      requisitos: [
        'SQL, Python',
        'ETL, Data Warehousing',
        'Apache Spark, Hadoop',
        'Cloud Data Platforms (BigQuery, Redshift)'
      ],
      imagen: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png'
    }
  ];

  vacanteSeleccionada = this.vacantes[0];

  seleccionarVacante(vacante: any): void {
    this.vacanteSeleccionada = vacante;
  }

  editarVacante(vacante: any): void {
    console.log('Editar vacante:', vacante);
    // Aquí puedes abrir un modal, por ejemplo
  }
  
  eliminarVacante(vacante: any): void {
    console.log('Eliminar vacante:', vacante);
    // Aquí puedes mostrar un SweetAlert2 de confirmación
  }
  
}
