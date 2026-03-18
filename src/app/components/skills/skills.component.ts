import { Component } from '@angular/core';

interface SkillCategory {
  name: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  categories: SkillCategory[] = [
    {
      name: 'Frontend',
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'HTML5', 'SCSS', 'PrimeNG']
    },
    {
      name: 'Backend',
      skills: ['.NET Core', 'C#', 'ASP.NET Web API', 'Entity Framework Core', 'MediatR', 'CQRS']
    },
    {
      name: 'Database',
      skills: ['SQL Server', 'PostgreSQL', 'Redis']
    },
    {
      name: 'DevOps & Tools',
      skills: ['Git', 'GitHub Actions', 'Docker', 'Azure']
    },
    {
      name: 'Other',
      skills: ['OpenCV', 'Computer Vision', 'REST API Design', 'Clean Architecture', 'Design Patterns']
    }
  ];
}
