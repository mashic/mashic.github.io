import { Project, RssSuiteApp } from '../models/project.model';

export const FEATURED_PROJECTS: Project[] = [
  {
    title: 'Kanban Board',
    description: 'Real-time collaborative task management with drag-and-drop, WebSocket synchronization, and multi-board support.',
    techStack: ['Angular', '.NET Core', 'SignalR', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/mashic',
    highlights: [
      'Real-time collaboration with WebSockets',
      'Drag-and-drop task management',
      'Multi-board workspace support'
    ],
    featured: true
  },
  {
    title: '.NET Blog',
    description: 'Clean Architecture blog platform with CQRS pattern, MediatR pipeline, and rich content management.',
    techStack: ['ASP.NET Core', 'MediatR', 'CQRS', 'Entity Framework Core', 'PostgreSQL'],
    githubUrl: 'https://github.com/mashic',
    highlights: [
      'Clean Architecture with MediatR + CQRS',
      'Pipeline behaviors for validation & logging',
      'Rich content management system'
    ],
    featured: true
  },
  {
    title: 'Car Rental',
    description: 'Booking platform with Factory and Decorator design patterns, NgRx state management, and admin approval workflow.',
    techStack: ['Angular 17', '.NET 8', 'NgRx', 'SQL Server', 'FluentValidation'],
    githubUrl: 'https://github.com/mashic',
    highlights: [
      'Factory Pattern for polymorphic user creation',
      'Decorator Pattern for cross-cutting concerns',
      'NgRx Entity Adapter for normalized state'
    ],
    featured: true
  },
  {
    title: 'Hiking App',
    description: 'Progressive scalability demonstration — from monolith to distributed system with load test proof at each stage.',
    techStack: ['Angular', '.NET Core', 'PostgreSQL', 'Redis', 'k6 Load Testing'],
    githubUrl: 'https://github.com/mashic',
    highlights: [
      'Progressive scalability architecture',
      'Load test proof at each scaling stage',
      'Caching and performance optimization'
    ],
    featured: true
  }
];

export const RSS_SUITE_APPS: RssSuiteApp[] = [
  {
    name: 'CRM',
    description: 'Multi-tenant customer relationship management for tracking clients, events, tasks, and sales pipeline across companies.',
    techStack: ['ASP.NET Core 6', 'EF Core 7', 'Angular 16', 'SQL Server'],
    highlights: ['Generic CRUD with Template Method pattern', 'Multi-tenancy', 'Soft delete audit trail']
  },
  {
    name: 'ERP',
    description: 'Enterprise resource planning portal for retail — articles, suppliers, warehouses, invoicing, and inventory on top of 500+ stored procedures.',
    techStack: ['.NET Core', 'ADO.NET', 'Angular', 'SQL Server'],
    highlights: ['500+ stored procedures', '43 feature modules', 'Legacy database integration']
  },
  {
    name: 'POS Analytics',
    description: 'Sales analytics dashboard for retail chains — daily/weekly/monthly reports, receipt lookups, and cashier performance metrics.',
    techStack: ['ASP.NET Web API', 'ADO.NET', 'Angular', 'ngx-charts'],
    highlights: ['40+ reporting endpoints', 'Multi-series performance charts', 'Real-time POS monitoring']
  },
  {
    name: 'Loyalty Program',
    description: 'Multi-platform loyalty system — earn points on purchases and redeem rewards across web, mobile PWA, and WinForms terminals.',
    techStack: ['ASP.NET Core 6', 'EF Core 7', 'Angular PWA', 'Firebase'],
    highlights: ['Offline-first POS with SQLite', 'Push notifications via Firebase', 'Event-based sync']
  },
  {
    name: 'Manufacturing MES',
    description: 'Manufacturing Execution System tracking production lifecycle — raw materials, work operations, machine assignments, quality control.',
    techStack: ['ASP.NET Core 5', 'EF Core 5', 'Angular 10', 'SQL Server'],
    highlights: ['5-level generic CRUD hierarchy', 'SAP XML import pipeline', 'OEE production analytics']
  },
  {
    name: 'Hotel Reservation',
    description: 'Hospitality booking system — daily/hourly events, group reservations, seasonal pricing, fiscal compliance, and invoice generation.',
    techStack: ['.NET 8', 'EF Core 9', 'Angular 19', 'PostgreSQL', 'Hangfire'],
    highlights: ['Race-condition-proof bookings (SERIALIZABLE)', 'Background jobs via Hangfire', 'Seasonal pricing algorithm']
  },
  {
    name: 'E-Commerce',
    description: 'B2C webshop with product catalog, shopping cart, checkout, Monri payment gateway, product variants, and time-based discounts.',
    techStack: ['.NET Core', 'EF Core + Dapper', 'Angular', 'SQL Server'],
    highlights: ['Hybrid ORM (EF writes, Dapper reads)', 'Payment gateway integration', 'Happy Hour discount engine']
  },
  {
    name: 'Computer Vision',
    description: 'Suite of 4 interconnected apps for real-time object detection, tracking, and geospatial analysis from video surveillance.',
    techStack: ['C# .NET', 'OpenCvSharp4', 'Milestone XProtect SDK', 'WinForms'],
    highlights: ['MOG2 background subtraction', 'Pixel-to-GPS coordinate conversion', 'PTZ camera automation']
  }
];
