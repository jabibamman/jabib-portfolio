import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-experience-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-zinc-800 rounded-xl p-6 flex flex-col shadow border-l-8 border-violet-500">
      <div class="text-lg font-bold text-white mb-2 truncate">{{ role }}</div>
      <div class="text-pink-400 font-semibold mb-1">{{ company }}</div>
      <div class="text-xs text-zinc-400 mb-1">{{ period }}</div>
      <div class="text-white/90 mb-2" [innerHTML]="description"></div>
      <div class="flex flex-wrap gap-2 mt-1">
        <span
          *ngFor="let tag of tags"
          class="bg-zinc-700 text-yellow-200 px-3 py-1 rounded-lg text-xs font-mono"
          >{{ tag }}</span
        >
      </div>
    </div>
  `,
})
export class ExperienceCardComponent {
  @Input() role!: string;
  @Input() company!: string;
  @Input() period!: string;
  @Input() description!: string;
  @Input() tags!: string[];
}
