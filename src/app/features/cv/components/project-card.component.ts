import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-project-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-zinc-800 rounded-xl p-6 flex flex-col shadow border-l-8 border-pink-500">
      <div class="text-lg font-bold text-white mb-2">{{ name }}</div>
      <div class="text-white/90 mb-3" [innerHTML]="description"></div>
      <div class="text-xs text-violet-300 font-mono mb-3">{{ link }}</div>
      <div class="flex flex-wrap gap-2 mt-auto">
        <span
          *ngFor="let tech of technologies"
          class="bg-zinc-700 text-yellow-200 px-3 py-1 rounded-lg text-xs font-mono"
          >{{ tech }}</span
        >
      </div>
    </div>
  `,
})
export class ProjectCardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() technologies!: string[];
}