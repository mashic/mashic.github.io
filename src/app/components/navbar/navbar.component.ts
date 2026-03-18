import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = false;

  navLinks = [
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Experience', target: 'experience' },
    { label: 'Architecture', target: 'architecture' },
    { label: 'Contact', target: 'contact' },
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(sectionId: string): void {
    this.menuOpen = false;
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
