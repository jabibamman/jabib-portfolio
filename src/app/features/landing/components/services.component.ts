import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-services",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section class="relative py-24 px-6 bg-zinc-950">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/50 backdrop-blur-sm border border-violet-800/50 rounded-full text-sm text-violet-300 mb-4">
            <lucide-icon name="sparkles" [size]="16"></lucide-icon>
            <span>Services premium</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span
              class="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Comment puis-je vous aider ?
            </span>
          </h2>
          <p class="text-xl text-zinc-400 max-w-2xl mx-auto">
            Des solutions sur mesure pour transformer vos idées en réalité
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="group relative p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-violet-700 transition-all duration-300 hover:scale-105">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <lucide-icon
                  name="code"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>

              <h3 class="text-2xl font-bold text-white mb-3">
                Développement Full-Stack
              </h3>

              <p class="text-zinc-400 mb-6">
                Applications web modernes et performantes avec les dernières
                technologies
              </p>

              <ul class="space-y-2 text-sm text-zinc-500">
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Angular, React, Vue.js</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>APIs RESTful & GraphQL</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Java, TypeScript, Rust</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="group relative p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-violet-700 transition-all duration-300 hover:scale-105">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <lucide-icon
                  name="cloud"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>

              <h3 class="text-2xl font-bold text-white mb-3">
                Architecture Cloud
              </h3>

              <p class="text-zinc-400 mb-6">
                Solutions scalables et sécurisées pour vos infrastructures
                modernes
              </p>

              <ul class="space-y-2 text-sm text-zinc-500">
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Microservices & Conteneurs</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>CI/CD & DevOps</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>AWS, Azure, GCP</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            class="group relative p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-violet-700 transition-all duration-300 hover:scale-105">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <lucide-icon
                  name="graduation-cap"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>

              <h3 class="text-2xl font-bold text-white mb-3">
                Consulting & Formation
              </h3>

              <p class="text-zinc-400 mb-6">
                Accompagnement personnalisé pour améliorer vos pratiques
              </p>

              <ul class="space-y-2 text-sm text-zinc-500">
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Audit de code & Architecture</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Best practices & Clean code</span>
                </li>
                <li class="flex items-center gap-2">
                  <lucide-icon
                    name="zap"
                    [size]="16"
                    class="text-violet-400"></lucide-icon>
                  <span>Mentorat & Pair programming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <p class="text-zinc-400 mb-6">Un projet en tête ? Discutons-en !</p>
          <button
            (click)="openCalendly()"
            class="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-semibold text-white shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105">
            <span class="relative z-10">Planifier un appel gratuit</span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}
