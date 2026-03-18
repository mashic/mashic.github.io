import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ArchitectureComponent } from './components/architecture/architecture.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ArchitectureComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const sections = this.el.nativeElement.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((section: Element) => observer.observe(section));
  }
}
