import { Component } from '@angular/core';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  domains: string[];
  highlights: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      role: 'Software Developer',
      company: 'RSS',
      period: '2021 — Present',
      description:
        'Full-stack developer working across a suite of enterprise applications serving diverse business domains. Building and maintaining production Angular + .NET systems used by real clients in CRM, ERP, manufacturing, hospitality, retail, and e-commerce.',
      domains: [
        'CRM',
        'ERP',
        'POS & Analytics',
        'Loyalty Programs',
        'Manufacturing MES',
        'Hotel Reservations',
        'E-Commerce',
      ],
      highlights: [
        'Developed and maintained 7+ production applications across distinct business domains',
        'Built reusable Angular component libraries shared across the entire suite',
        'Designed RESTful APIs with .NET serving complex business workflows',
        'Implemented real-time dashboards for sales analytics and POS reporting',
        'Created loyalty program engines with tier-based reward calculations',
        'Integrated manufacturing execution systems with production scheduling',
        'Optimized SQL Server queries and Entity Framework data access patterns',
        'Participated in code reviews, sprint planning, and cross-team collaboration',
      ],
    },
  ];
}
