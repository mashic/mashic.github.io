export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  featured: boolean;
}

export interface RssSuiteApp {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
}
