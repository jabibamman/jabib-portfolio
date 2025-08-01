import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";

@Component({
  selector: "app-process",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  template: `
    <section
      class="relative py-24 px-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span
              class="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {{ 'landing.process.title' | translate | async }}
            </span>
          </h2>
          <p class="text-xl text-zinc-400 max-w-2xl mx-auto">
            {{ 'landing.process.subtitle' | translate | async }}
          </p>
        </div>

        <div class="relative">
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-violet-600 to-pink-600"></div>

          <div class="space-y-16">
            <div class="relative flex items-center">
              <div class="flex-1 text-right pr-8 md:pr-16">
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ 'landing.process.step1.title' | translate | async }}
                </h3>
                <p class="text-zinc-400">
                  {{ 'landing.process.step1.description' | translate | async }}
                </p>
              </div>
              <div
                class="relative z-10 w-16 h-16 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <lucide-icon
                  name="message-square"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <div class="flex-1 pl-8 md:pl-16">
                <div class="text-4xl font-bold text-zinc-800">01</div>
              </div>
            </div>

            <div class="relative flex items-center">
              <div class="flex-1 text-right pr-8 md:pr-16">
                <div class="text-4xl font-bold text-zinc-800">02</div>
              </div>
              <div
                class="relative z-10 w-16 h-16 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <lucide-icon
                  name="lightbulb"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <div class="flex-1 pl-8 md:pl-16">
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ 'landing.process.step2.title' | translate | async }}
                </h3>
                <p class="text-zinc-400">
                  {{ 'landing.process.step2.description' | translate | async }}
                </p>
              </div>
            </div>

            <div class="relative flex items-center">
              <div class="flex-1 text-right pr-8 md:pr-16">
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ 'landing.process.step3.title' | translate | async }}
                </h3>
                <p class="text-zinc-400">
                  {{ 'landing.process.step3.description' | translate | async }}
                </p>
              </div>
              <div
                class="relative z-10 w-16 h-16 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <lucide-icon
                  name="code-2"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <div class="flex-1 pl-8 md:pl-16">
                <div class="text-4xl font-bold text-zinc-800">03</div>
              </div>
            </div>

            <div class="relative flex items-center">
              <div class="flex-1 text-right pr-8 md:pr-16">
                <div class="text-4xl font-bold text-zinc-800">04</div>
              </div>
              <div
                class="relative z-10 w-16 h-16 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50">
                <lucide-icon
                  name="rocket"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <div class="flex-1 pl-8 md:pl-16">
                <h3 class="text-2xl font-bold text-white mb-2">
                  {{ 'landing.process.step4.title' | translate | async }}
                </h3>
                <p class="text-zinc-400">
                  {{ 'landing.process.step4.description' | translate | async }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <p class="text-zinc-400">{{ 'landing.process.stats.ontime' | translate | async }}</p>
          </div>
          <div class="text-center">
            <div class="text-5xl font-bold text-violet-400 mb-2">
              {{ yearsOfExperience }}+
            </div>
            <p class="text-zinc-400">{{ 'landing.process.stats.experience' | translate | async }}</p>
          </div>
          <div class="text-center">
            <div
              class="text-5xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent mb-2">
              <lucide-icon
                name="check-circle"
                [size]="48"
                class="inline"></lucide-icon>
            </div>
            <p class="text-zinc-400">{{ 'landing.process.stats.satisfaction' | translate | async }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProcessComponent {
  yearsOfExperience: number;

  constructor() {
    const startDate = new Date("2021-01-01");
    const now = new Date();
    const years = now.getFullYear() - startDate.getFullYear();
    const monthDiff = now.getMonth() - startDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < startDate.getDate())
    ) {
      this.yearsOfExperience = years - 1;
    } else {
      this.yearsOfExperience = years;
    }
  }
}
