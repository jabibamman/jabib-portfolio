import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-12 pb-7">
      <div
        class="text-violet-400 uppercase font-bold text-sm mb-4 border-l-4 border-yellow-300 pl-3"
      >
        Key Skills
      </div>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <ng-container *ngFor="let skill of skills">
          <div>
            <span class="text-yellow-200 font-semibold mr-2">{{
              skill.label
            }}</span>
            <div class="w-40 bg-zinc-700 h-2 rounded mb-1">
              <div
                class="bg-gradient-to-r from-violet-500 to-yellow-300 h-2 rounded"
                [ngStyle]="{ width: skill.percent + '%' }"
              ></div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class SkillsComponent {
  skills = [
    { label: "Java", percent: 98 },
    { label: "Typescript", percent: 95 },
    { label: "Rust", percent: 84 },
    { label: "Python", percent: 87 },
    { label: "Vue 3", percent: 92 },
    { label: "React", percent: 89 },
    { label: "Spring Boot", percent: 95 },
    { label: "Docker", percent: 91 },
    { label: "Kubernetes", percent: 78 },
    { label: "CI/CD", percent: 80 },
  ];
}
