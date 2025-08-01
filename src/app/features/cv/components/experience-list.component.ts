import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExperienceCardComponent } from "./experience-card.component";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";

@Component({
  selector: "app-experience-list",
  standalone: true,
  imports: [CommonModule, ExperienceCardComponent, TranslatePipe],
  template: `
    <div class="px-12 py-6">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        {{ 'cv.sections.experience' | translate | async }}
      </div>
      <div class="flex flex-col gap-6">
        <app-experience-card
          role="{{ 'cv.experience.upstra.role' | translate | async }}"
          company="{{ 'cv.experience.upstra.company' | translate | async }}"
          period="{{ 'cv.experience.upstra.period' | translate | async }}"
          description="{{ 'cv.experience.upstra.description' | translate | async }}"
          [tags]="['NestJS', 'Python', 'Vue 3', 'Docker', 'DDD']"
        ></app-experience-card>
        <app-experience-card
          role="{{ 'cv.experience.insee.role' | translate | async }}"
          company="{{ 'cv.experience.insee.company' | translate | async }}"
          period="{{ 'cv.experience.insee.period' | translate | async }}"
          description="{{ 'cv.experience.insee.description' | translate | async }}"
          [tags]="['Java', 'Spring Boot', 'React', 'Spring Batch', 'GCP']"
        ></app-experience-card>
      </div>
    </div>
  `,
})
export class ExperienceListComponent {}
