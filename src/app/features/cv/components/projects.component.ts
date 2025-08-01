import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";
import { ProjectCardComponent } from "./project-card.component";
import { TranslationService } from "../../../core/services/translation.service";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [CommonModule, TranslatePipe, ProjectCardComponent],
  template: `
    <div class="px-12 pb-7">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        {{ 'cv.sections.projects' | translate | async }}
      </div>
      <div class="flex flex-col gap-4">
        <app-project-card
          [name]="translationService.instant('cv.projects.codeValley.name')"
          [description]="translationService.instant('cv.projects.codeValley.description')"
          [link]="translationService.instant('cv.projects.codeValley.link')"
          [technologies]="['NestJS', 'Rust', 'PostgreSQL', 'MongoDB', 'Kubernetes', 'Vue.js', 'Kotlin']"
        />
        <app-project-card
          [name]="translationService.instant('cv.projects.frakt.name')"
          [description]="translationService.instant('cv.projects.frakt.description')"
          [link]="translationService.instant('cv.projects.frakt.link')"
          [technologies]="['Rust', 'GitHub Actions', 'Rustdoc', 'Fractales']"
        />
        <app-project-card
          [name]="translationService.instant('cv.projects.greenItForward.name')"
          [description]="translationService.instant('cv.projects.greenItForward.description')"
          [link]="translationService.instant('cv.projects.greenItForward.link')"
          [technologies]="['Docker', 'TypeScript', 'NestJS', 'Java', 'Angular']"
        />
      </div>
    </div>
  `,
})
export class ProjectsComponent {
  constructor(public translationService: TranslationService) {}
}
