import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
// Import modular translations
import * as landingFr from '../../../locale/fr/landing.json';
import * as wipFr from '../../../locale/fr/wip.json';
import * as legalFr from '../../../locale/fr/legal.json';

import * as landingEn from '../../../locale/en/landing.json';
import * as wipEn from '../../../locale/en/wip.json';
import * as legalEn from '../../../locale/en/legal.json';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  private cache = new Map<string, any>();
  private staticTranslations = {
    fr: {
      landing: landingFr,
      wip: wipFr,
      legal: legalFr,
    },
    en: {
      landing: landingEn,
      wip: wipEn,
      legal: legalEn,
    },
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loadTranslations(locale: string): Observable<any> {
    const cacheKey = `messages.${locale}`;

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    // Combine all modules for the locale
    const localeModules = this.staticTranslations[locale as keyof typeof this.staticTranslations];
    if (localeModules) {
      const combined = {
        landing: localeModules.landing,
        wip: localeModules.wip,
        legal: localeModules.legal,
      };
      this.cache.set(cacheKey, combined);
      return of(combined);
    }

    return of({});
  }
}
