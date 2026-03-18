import { Component } from '@angular/core';
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
export class App {}
