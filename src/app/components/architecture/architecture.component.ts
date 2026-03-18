import { Component, signal } from '@angular/core';

interface ArchDiagram {
  title: string;
  description: string;
  layers: { label: string; items: string[]; color: string }[];
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss'
})
export class ArchitectureComponent {
  activeTab = signal(0);

  diagrams: ArchDiagram[] = [
    {
      title: 'Clean Architecture — .NET Backend',
      description:
        'Layered architecture used across the RSS suite .NET APIs. Each layer has a single responsibility and dependencies point inward.',
      layers: [
        {
          label: 'Presentation',
          items: ['Controllers', 'Middleware', 'Filters', 'API Models'],
          color: '#64ffda',
        },
        {
          label: 'Application',
          items: ['MediatR Handlers', 'Validators', 'DTOs', 'Interfaces'],
          color: '#57cbff',
        },
        {
          label: 'Domain',
          items: ['Entities', 'Value Objects', 'Domain Events', 'Specifications'],
          color: '#c792ea',
        },
        {
          label: 'Infrastructure',
          items: ['EF Core', 'Repositories', 'External APIs', 'Caching'],
          color: '#ffcb6b',
        },
      ],
    },
    {
      title: 'Angular Component Architecture',
      description:
        'Smart/Dumb component pattern with NgRx-inspired state management used in the front-end applications.',
      layers: [
        {
          label: 'Pages (Smart)',
          items: ['Route Components', 'State Connections', 'Side Effects'],
          color: '#64ffda',
        },
        {
          label: 'Features',
          items: ['Feature Modules', 'Lazy Loading', 'Guard Routes'],
          color: '#57cbff',
        },
        {
          label: 'UI (Dumb)',
          items: ['Presentational', 'Input/Output', 'OnPush Strategy'],
          color: '#c792ea',
        },
        {
          label: 'Core / Shared',
          items: ['Services', 'Interceptors', 'Pipes', 'Directives'],
          color: '#ffcb6b',
        },
      ],
    },
  ];

  setTab(index: number) {
    this.activeTab.set(index);
  }
}
