import { Component } from "@angular/core";
import { ExperienceCardComponent } from "./experience-card.component";

@Component({
  selector: "app-experience-list",
  standalone: true,
  imports: [ExperienceCardComponent],
  template: `
    <div class="px-12 py-6">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        Professional Experience
      </div>
      <div class="flex flex-col gap-6">
        <app-experience-card
          role="Fullstack Developer"
          company="Eurialys – Upstra Project"
          period="Mar 2025 – Present · Freelance (real client, MSc validation)"
          [description]="
            'Designed and developed the Upstra platform (infra management for labs):<br>Microservices archi (NestJS DDD/hexagonal), Python (UPS/iLO), Vue 3 front.<br>Docker Compose, modular API, docs & client demo.'
          "
          [tags]="['NestJS', 'Python', 'Vue 3', 'Docker', 'DDD']"
        ></app-experience-card>
        <app-experience-card
          role="Fullstack Developer (apprenticeship)"
          company="INSEE"
          period="Sep 2022 – Present"
          [description]="
            'Designed, developed & maintained critical APIs (Spring Boot 3, Java 21) + React front.<br>Modernized data pipelines (Talend → Spring Batch 5.1).<br>Teamwork on high-impact public solutions.'
          "
          [tags]="['Java', 'Spring Boot', 'React', 'Spring Batch', 'GCP']"
        ></app-experience-card>
      </div>
    </div>
  `,
})
export class ExperienceListComponent {}
