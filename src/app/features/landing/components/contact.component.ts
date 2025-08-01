import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule } from "lucide-angular";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  template: `
    <section
      class="relative py-24 px-6 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span
              class="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {{ "landing.contact.title" | translate | async }}
            </span>
          </h2>
          <p class="text-xl text-zinc-400">
            {{ "landing.contact.subtitle" | translate | async }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            class="group relative p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-violet-700 transition-all duration-300">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <lucide-icon
                  name="calendar"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">
                {{ "landing.contact.call.title" | translate | async }}
              </h3>
              <p class="text-zinc-400 mb-4">
                {{ "landing.contact.call.description" | translate | async }}
              </p>
              <button
                (click)="openCalendly()"
                class="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-300">
                {{ "common.buttons.book_appointment" | translate | async }}
                <lucide-icon name="send" [size]="16"></lucide-icon>
              </button>
            </div>
          </div>

          <div
            class="group relative p-8 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 hover:border-violet-700 transition-all duration-300">
            <div
              class="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div class="relative z-10">
              <div
                class="w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <lucide-icon
                  name="mail"
                  [size]="24"
                  class="text-white"></lucide-icon>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">
                {{ "landing.contact.email.title" | translate | async }}
              </h3>
              <p class="text-zinc-400 mb-4">
                {{ "landing.contact.email.description" | translate | async }}
              </p>
              <a
                href="mailto:james.abibamman@gmail.com"
                class="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-300">
                contact&#64;jabib.dev
                <lucide-icon name="send" [size]="16"></lucide-icon>
              </a>
            </div>
          </div>
        </div>

        <div class="text-center">
          <p class="text-zinc-400 mb-6">
            {{ "landing.contact.social" | translate | async }}
          </p>
          <div class="flex justify-center gap-4">
            <a
              href="https://github.com/jabibamman"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:border-violet-700 hover:bg-violet-950/50 transition-all duration-300">
              <lucide-icon
                name="github"
                [size]="20"
                class="text-zinc-400"></lucide-icon>
            </a>
            <a
              href="https://linkedin.com/in/jamesabib"
              target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:border-violet-700 hover:bg-violet-950/50 transition-all duration-300">
              <lucide-icon
                name="linkedin"
                [size]="20"
                class="text-zinc-400"></lucide-icon>
            </a>
          </div>
        </div>

        <div
          class="mt-16 p-8 bg-gradient-to-r from-violet-950/50 to-pink-950/50 rounded-2xl border border-violet-800/50 text-center">
          <h3 class="text-2xl font-bold text-white mb-4">
            {{ "landing.contact.cta.title" | translate | async }}
          </h3>
          <p class="text-zinc-400 mb-6">
            {{ "landing.contact.cta.subtitle" | translate | async }}
          </p>
          <button
            (click)="openCalendly()"
            class="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-semibold text-white shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105">
            <span class="relative z-10">{{
              "landing.contact.cta.button" | translate | async
            }}</span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  openCalendly() {
    const calendlyUrl = "https://calendly.com/jabibamman/30min";
    window.open(calendlyUrl, "calendly", "width=800,height=800");
  }
}
