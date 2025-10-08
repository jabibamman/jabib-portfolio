import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleRoutingService } from '../services/locale-routing.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-1 border border-zinc-800"
    >
      <button
        (click)="switchLanguage('fr')"
        [disabled]="isLoading"
        [class]="
          currentLang === 'fr'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-transparent text-zinc-400 hover:text-white'
        "
        class="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        FR
      </button>
      <button
        (click)="switchLanguage('en')"
        [disabled]="isLoading"
        [class]="
          currentLang === 'en'
            ? 'bg-violet-600 text-white shadow-lg'
            : 'bg-transparent text-zinc-400 hover:text-white'
        "
        class="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        EN
      </button>
    </div>
  `,
})
export class LanguageSwitcherComponent {
  isLoading = false;

  constructor(private localeRoutingService: LocaleRoutingService) {}

  get currentLang(): string {
    return this.localeRoutingService.getCurrentLocale();
  }

  switchLanguage(lang: string): void {
    if (lang !== this.currentLang) {
      this.isLoading = true;
      this.localeRoutingService.switchLocale(lang);
      setTimeout(() => (this.isLoading = false), 300);
    }
  }
}
