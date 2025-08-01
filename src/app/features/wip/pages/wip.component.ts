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
      class="wip-bg min-h-[70vh] flex flex-col items-center justify-center py-20 relative overflow-hidden">
      <div class="wip-glow"></div>
      <div class="absolute top-8 left-8 animate-fade-in">
        <span class="badge text-xs font-mono px-3 py-1 rounded-full"
          >jabib.dev</span
        >
      </div>

      <div class="absolute top-8 right-8">
        <app-language-switcher />
      </div>

      <div class="mb-10 flex flex-col items-center z-10">
        <div class="console-box mb-8">
          <div class="console-header flex items-center gap-2">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div
            class="console-content text-left font-mono text-base leading-relaxed">
            <span class="console-cursor animate-blink">></span>
            <span class="console-typing">
              {{ displayText }}<span class="type-cursor">|</span>
            </span>
          </div>
        </div>

        <div class="wip-spinner mb-8"></div>

        <!--div class="flex justify-center w-full">
          <h1
            class="wip-title text-4xl md:text-5xl font-extrabold text-violet-400 drop-shadow-lg tracking-widest animate-glow text-center"
          >
            Work in Progress
          </h1>
        </div>-->
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
            class="wip-link flex items-center gap-2 hover:text-white transition">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 ..." />
            </svg>
            <span>github.com/jabibamman</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jamesabib/"
            target="_blank"
            class="wip-link flex items-center gap-2 hover:text-white transition">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.327 ..." />
            </svg>
            <span>linkedin.com/in/jamesabib</span>
          </a>
        </div>

        <button
          class="mt-8 px-6 py-2 rounded-xl font-bold text-lg shadow wip-btn"
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
