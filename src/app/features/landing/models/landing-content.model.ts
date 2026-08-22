export interface JobEntry {
  id: string;
  org: string;
  initial: string;
  logo: string;
  role: string;
  dates: string;
  details: string;
  skills: string[];
}

export interface EducationEntry {
  org: string;
  degree: string;
  dates: string;
  logo: string;
}

export interface ProjectItem {
  name: string;
  date: string;
  description: string;
  tags: string[];
  href: string;
  linkType: 'website' | 'source';
  inProgress?: boolean;
}

export interface ArticleEntry {
  title: string;
  excerpt: string;
}
