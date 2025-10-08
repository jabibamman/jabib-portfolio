import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocaleRoutingService } from '../../core/services/locale-routing.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <button
        *ngFor="let locale of locales"
        (click)="switchLanguage(locale)"
        [class]="getButtonClasses(locale)"
        [attr.aria-label]="'Switch to ' + getLanguageName(locale)"
        [attr.aria-current]="locale === currentLocale ? 'true' : null"
        class="px-4 py-2 rounded-lg font-medium transition-all duration-200 border">
        {{ locale.toUpperCase() }}
      </button>
    </div>
  `,
  styles: [
    `
      button {
        cursor: pointer;
      }

      button:hover {
        transform: scale(1.05);
      }
    `,
  ],
})
export class LanguageSwitcherComponent {
  locales = ['fr', 'en'];
  currentLocale: string;

  constructor(private localeRouting: LocaleRoutingService) {
    this.currentLocale = this.localeRouting.getCurrentLocale();
  }

  switchLanguage(locale: string): void {
    if (locale !== this.currentLocale) {
      this.localeRouting.switchLocale(locale);
      this.currentLocale = locale;
    }
  }

  getLanguageName(locale: string): string {
    const names: Record<string, string> = {
      fr: 'Français',
      en: 'English',
    };
    return names[locale] || locale;
  }

  getButtonClasses(locale: string): string {
    const isActive = locale === this.currentLocale;
    return isActive
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  }
}
