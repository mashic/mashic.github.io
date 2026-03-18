import { Component } from '@angular/core';
import { Project, RssSuiteApp } from '../../models/project.model';
import { FEATURED_PROJECTS, RSS_SUITE_APPS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  featuredProjects: Project[] = FEATURED_PROJECTS;
  rssSuiteApps: RssSuiteApp[] = RSS_SUITE_APPS;
}
