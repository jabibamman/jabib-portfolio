import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../../../core/components/language-switcher.component';
import { ThemeService } from '../../../core/services/theme.service';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { ExperienceComponent } from '../components/experience/experience.component';
import { EducationComponent } from '../components/education/education.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { WritingComponent } from '../components/writing/writing.component';
import { ContactComponent } from '../components/contact/contact.component';
import { DockComponent } from '../components/dock/dock.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    WritingComponent,
    ContactComponent,
    DockComponent,
  ],
  template: `
    <div
      [attr.data-theme]="theme.theme$ | async"
      class="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style="padding: clamp(3rem, 8vw, 6rem) 1.5rem 8rem"
    >
      <app-language-switcher />

      <main class="max-w-[42rem] mx-auto flex flex-col gap-10">
        <app-hero />
        <app-about />
        <app-experience />
        <app-education />
        <app-projects />
        <app-writing />
        <app-contact />
      </main>

      <app-dock />
    </div>
  `,
})
export class LandingComponent {
  constructor(public theme: ThemeService) {}
}
