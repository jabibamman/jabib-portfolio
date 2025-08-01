import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: "app-hero-section",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-violet-950 via-zinc-950 to-pink-950">
        <div class="absolute inset-0 opacity-20">
          <div
            class="absolute inset-0"
            style="background-image: radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>

        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/50 backdrop-blur-sm border border-violet-800/50 rounded-full text-sm text-violet-300 mb-8">
          <lucide-icon name="sparkles" [size]="16"></lucide-icon>
          <span>Disponible pour vos projets</span>
        </div>

        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span
            class="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Développeur
          </span>
          <br />
          <span
            class="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Fullstack
          </span>
        </h1>

        <p class="text-xl md:text-2xl text-zinc-300 mb-4 max-w-2xl mx-auto">
          James ABIB - Architecte logiciel passionné par la création de
          solutions robustes et innovantes
        </p>

        <div class="flex flex-wrap gap-3 justify-center mb-12">
          <span
            class="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300">
            Java
          </span>
          <span
            class="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300">
            TypeScript
          </span>
          <span
            class="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300">
            Rust
          </span>
          <span
            class="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300">
            Angular
          </span>
          <span
            class="px-4 py-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300">
            Cloud
          </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="openCalendly()"
            class="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-semibold text-white shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105">
            <span class="flex items-center gap-3">
              <lucide-icon name="calendar" [size]="20"></lucide-icon>
              Prendre rendez-vous
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
          </button>

          <a
            routerLink="/cv"
            class="group px-8 py-4 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-300 hover:scale-105">
            <span class="flex items-center gap-3">
              <lucide-icon name="code-2" [size]="20"></lucide-icon>
              Voir mon CV
            </span>
          </a>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div
            class="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
            <div
              class="w-1 h-3 bg-zinc-600 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      <div
        class="absolute top-20 left-10 text-violet-500 opacity-20 animate-spin-slow">
        <lucide-icon name="code-2" [size]="48"></lucide-icon>
      </div>
      <div
        class="absolute bottom-20 right-10 text-pink-500 opacity-20 animate-spin-slow-reverse">
        <lucide-icon name="rocket" [size]="48"></lucide-icon>
      </div>
    </section>
  `,
  styles: [
    `
      @keyframes float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(10deg);
        }
      }

      @keyframes float-delayed {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-30px) rotate(-10deg);
        }
      }

      @keyframes scroll {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(3px);
        }
        100% {
          transform: translateY(0);
        }
      }

      @keyframes spin-slow {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes spin-slow-reverse {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }

      .animate-float-delayed {
        animation: float-delayed 6s ease-in-out infinite;
        animation-delay: 2s;
      }

      .animate-scroll {
        animation: scroll 1.5s ease-in-out infinite;
      }

      .animate-spin-slow {
        animation: spin-slow 20s linear infinite;
      }

      .animate-spin-slow-reverse {
        animation: spin-slow-reverse 20s linear infinite;
      }
    `,
  ],
})
export class HeroSectionComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}
