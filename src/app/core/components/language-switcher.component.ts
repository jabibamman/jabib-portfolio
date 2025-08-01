import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-1 border border-zinc-800">
      <button
        (click)="switchLanguage('fr')"
        [class]="currentLang === 'fr' ? 'bg-violet-600 text-white shadow-lg' : 'bg-transparent text-zinc-400 hover:text-white'"
        class="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200">
        FR
      </button>
      <button
        (click)="switchLanguage('en')"
        [class]="currentLang === 'en' ? 'bg-violet-600 text-white shadow-lg' : 'bg-transparent text-zinc-400 hover:text-white'"
        class="px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200">
        EN
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  constructor(private translationService: TranslationService) {}

  get currentLang(): string {
    return this.translationService.currentLang;
  }

  switchLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }
}