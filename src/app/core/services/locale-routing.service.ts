import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class LocaleRoutingService {
  private readonly supportedLocales = ['fr', 'en'];
  private readonly defaultLocale = 'fr';

  constructor(
    private router: Router,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Get current locale from URL path
   */
  getCurrentLocale(): string {
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      for (const locale of this.supportedLocales) {
        if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
          return locale;
        }
      }
    }
    return this.defaultLocale;
  }

  /**
   * Switch to a different locale while maintaining the current route
   */
  switchLocale(targetLocale: string): void {
    if (!this.supportedLocales.includes(targetLocale)) {
      console.warn(`Unsupported locale: ${targetLocale}`);
      return;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const currentLocale = this.getCurrentLocale();

    if (currentLocale === targetLocale) {
      return;
    }

    const currentPath = window.location.pathname;

    let pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');

    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    if (pathWithoutLocale === '/') {
      pathWithoutLocale = '';
    }

    const newPath = `/${targetLocale}${pathWithoutLocale}`;

    this.translationService.setLocale(targetLocale);

    this.router.navigateByUrl(newPath).then(() => {
      this.translationService.setLocale(targetLocale);
    });
  }

  /**
   * Get the alternate URL for a specific locale
   */
  getLocaleUrl(locale: string, path?: string): string {
    if (!this.supportedLocales.includes(locale)) {
      return '/';
    }

    const currentPath =
      path || (isPlatformBrowser(this.platformId) ? window.location.pathname : '/');
    const currentLocale = this.getCurrentLocale();

    let pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    return `/${locale}${pathWithoutLocale}`;
  }

  /**
   * Get all alternate URLs for hreflang tags
   */
  getAlternateUrls(baseUrl: string = 'https://jabib.dev'): Array<{ locale: string; url: string }> {
    const currentPath = isPlatformBrowser(this.platformId) ? window.location.pathname : '/';
    const currentLocale = this.getCurrentLocale();

    let pathWithoutLocale = currentPath.replace(`/${currentLocale}`, '');
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    return this.supportedLocales.map(locale => ({
      locale,
      url: `${baseUrl}/${locale}${pathWithoutLocale}`,
    }));
  }

  /**
   * Check if a locale is supported
   */
  isLocaleSupported(locale: string): boolean {
    return this.supportedLocales.includes(locale);
  }

  /**
   * Get list of supported locales
   */
  getSupportedLocales(): string[] {
    return [...this.supportedLocales];
  }

  /**
   * Get default locale
   */
  getDefaultLocale(): string {
    return this.defaultLocale;
  }
}
