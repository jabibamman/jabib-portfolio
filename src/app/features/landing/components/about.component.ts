import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <section class="relative py-24 px-6 bg-zinc-950">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="relative z-10 rounded-2xl overflow-hidden">
              <img
                src="https://api.dicebear.com/8.x/lorelei/svg?seed=James&backgroundColor=8b5cf6,ec4899&backgroundType=gradientLinear&backgroundRotation=135"
                alt="James ABIB"
                class="w-full h-[500px] object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
            </div>

            <div
              class="absolute -top-4 -left-4 w-24 h-24 bg-violet-600 rounded-full blur-3xl opacity-20"></div>
            <div
              class="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-600 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div class="space-y-6">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              <span
                class="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                À propos de moi
              </span>
            </h2>

            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-violet-950 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon
                    name="user"
                    [size]="20"
                    class="text-violet-400"></lucide-icon>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">
                    Qui suis-je ?
                  </h3>
                  <p class="text-zinc-400">
                    Développeur fullstack passionné, je combine expertise
                    technique et vision moderne pour créer des solutions qui
                    font la différence. Mon approche allie rigueur et
                    créativité.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-violet-950 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon
                    name="briefcase"
                    [size]="20"
                    class="text-violet-400"></lucide-icon>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">
                    Mon parcours
                  </h3>
                  <p class="text-zinc-400">
                    Actuellement développeur à l'INSEE, j'ai acquis une solide
                    expérience dans la création et maintenance de systèmes
                    critiques. En parallèle, je mets mes compétences au service
                    de projets innovants en tant qu'auto-entrepreneur.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="w-10 h-10 bg-violet-950 rounded-lg flex items-center justify-center flex-shrink-0">
                  <lucide-icon
                    name="heart"
                    [size]="20"
                    class="text-violet-400"></lucide-icon>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-white mb-2">
                    Ma philosophie
                  </h3>
                  <p class="text-zinc-400">
                    Je crois en un code propre, maintenable et performant.
                    Chaque projet est une opportunité de repousser les limites
                    et de créer quelque chose d'exceptionnel.
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-6">
              <a
                routerLink="/cv"
                class="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-300">
                Voir mon CV complet
                <lucide-icon name="arrow-right" [size]="20"></lucide-icon>
              </a>
            </div>
          </div>
        </div>

        <div
          class="mt-16 p-8 bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800">
          <h3 class="text-2xl font-bold text-white mb-6 text-center">
            Technologies maîtrisées
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-4xl font-bold text-violet-400 mb-2">Java</div>
              <p class="text-sm text-zinc-500">Backend robuste</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-pink-400 mb-2">
                TypeScript
              </div>
              <p class="text-sm text-zinc-500">Frontend moderne</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-violet-400 mb-2">Rust</div>
              <p class="text-sm text-zinc-500">Performance</p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-pink-400 mb-2">Cloud</div>
              <p class="text-sm text-zinc-500">Architecture scalable</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {}
