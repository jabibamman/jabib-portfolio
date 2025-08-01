import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { TranslatePipe } from "../../../core/pipes/translate.pipe";
import { TranslationService } from "../../../core/services/translation.service";
import { LanguageSwitcherComponent } from "../../../core/components/language-switcher.component";

@Component({
  selector: "app-wip",
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageSwitcherComponent],
  styleUrl: "./../wip.component.scss",
  template: `
    <div
      class="min-h-[100vh] bg-gradient-to-br from-[#181926] to-[#232347] flex flex-col items-center justify-center py-20 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-gradient-radial from-violet-400/30 via-pink-400/30 to-transparent blur-[120px] opacity-70 z-[1] -translate-x-1/2 -translate-y-1/2 scale-110 animate-pulse"></div>
      <div class="absolute top-8 left-8 animate-fade-in">
        <span class="bg-slate-800/85 border border-violet-400 text-violet-400 font-bold tracking-[0.13em] shadow-md backdrop-blur-sm text-xs font-mono px-3 py-1 rounded-full"
          >jabib.dev</span
        >
      </div>

      <div class="absolute top-8 right-8">
        <app-language-switcher />
      </div>

      <div class="mb-10 flex flex-col items-center z-10">
        <div class="bg-[#181926]/95 rounded-2xl border border-violet-400/20 shadow-2xl p-5 w-80 max-w-[80vw] mx-auto mb-4 relative z-10">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-3 h-3 rounded-full bg-red-400"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span class="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <div
            class="text-left font-mono text-base leading-relaxed text-[#fffbe9]">
            <span class="text-violet-400 font-bold mr-2 animate-pulse">></span>
            <span class="font-mono tracking-[0.02em] font-medium">
              {{ displayText }}<span class="animate-pulse">|</span>
            </span>
          </div>
        </div>

        <div class="w-[74px] h-[74px] border-8 border-violet-400/20 border-t-violet-400 rounded-full animate-spin mb-8 shadow-lg"></div>

        <p
          class="mt-6 text-lg md:text-xl text-zinc-200 text-center font-medium max-w-xl backdrop-blur-sm">
          {{ "wip.description" | translate | async }}<br />
          <span class="text-yellow-300 font-semibold">{{
            "wip.features" | translate | async
          }}</span>
          {{ "wip.and" | translate | async }}
          <span class="text-pink-400 font-semibold">{{
            "wip.tools" | translate | async
          }}</span>
          {{ "wip.comingSoon" | translate | async }} 🚀
        </p>

        <div
          class="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center">
          <a
            href="https://github.com/jabibamman"
            target="_blank"
            class="rounded-lg px-5 py-3 bg-[#181926]/80 border border-purple-600/20 shadow-md text-sm font-semibold transition-all hover:bg-[#181926] hover:text-white hover:border-violet-400/50 hover:shadow-lg flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 ..." />
            </svg>
            <span>github.com/jabibamman</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jamesabib/"
            target="_blank"
            class="rounded-lg px-5 py-3 bg-[#181926]/80 border border-purple-600/20 shadow-md text-sm font-semibold transition-all hover:bg-[#181926] hover:text-white hover:border-violet-400/50 hover:shadow-lg flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.327 ..." />
            </svg>
            <span>linkedin.com/in/jamesabib</span>
          </a>
        </div>

        <button
          class="mt-8 px-6 py-2 rounded-xl font-bold text-lg shadow bg-gradient-to-r from-violet-400 to-pink-400 text-white transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg"
          (click)="goHome()">
          <span>{{ "wip.returnHome" | translate | async }}</span>
        </button>
      </div>
    </div>
  `,
})
export class WipComponent implements OnInit, OnDestroy {
  isBrowser = false;

  messages: string[] = [];
  displayText = "";
  private msgIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingInterval: any = null;
  private pauseTimeout: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Load translated messages
    this.messages = [
      this.translationService.instant("wip.messages.building"),
      this.translationService.instant("wip.messages.hello"),
      this.translationService.instant("wip.messages.deploying"),
      this.translationService.instant("wip.messages.injecting"),
      this.translationService.instant("wip.messages.crafting"),
    ];

    if (this.isBrowser) {
      this.typeMessage();
    } else {
      this.displayText = this.messages[0];
    }

    this.translationService.currentLang$.subscribe(() => {
      this.messages = [
        this.translationService.instant("wip.messages.building"),
        this.translationService.instant("wip.messages.hello"),
        this.translationService.instant("wip.messages.deploying"),
        this.translationService.instant("wip.messages.injecting"),
        this.translationService.instant("wip.messages.crafting"),
      ];
    });
  }
  ngOnDestroy() {
    clearTimeout(this.typingInterval);
    clearTimeout(this.pauseTimeout);
  }

  typeMessage() {
    const currentMsg = this.messages[this.msgIndex];
    if (!this.isDeleting) {
      this.displayText = currentMsg.substring(0, this.charIndex + 1);
      if (this.charIndex < currentMsg.length) {
        this.charIndex++;
        this.typingInterval = setTimeout(() => this.typeMessage(), 38);
      } else {
        this.pauseTimeout = setTimeout(() => {
          this.isDeleting = true;
          this.typeMessage();
        }, 1200);
      }
    } else {
      this.displayText = currentMsg.substring(0, this.charIndex - 1);
      if (this.charIndex > 0) {
        this.charIndex--;
        this.typingInterval = setTimeout(() => this.typeMessage(), 18);
      } else {
        this.isDeleting = false;
        this.msgIndex = (this.msgIndex + 1) % this.messages.length;
        this.pauseTimeout = setTimeout(() => this.typeMessage(), 340);
      }
    }
  }

  goHome() {
    window.location.href = "/";
  }
}
