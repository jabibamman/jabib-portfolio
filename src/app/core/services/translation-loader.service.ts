import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import * as translationsFr from "../../../locale/messages.fr.json";
import * as translationsEn from "../../../locale/messages.en.json";

@Injectable({
  providedIn: "root",
})
export class TranslationLoaderService {
  private cache = new Map<string, any>();
  private staticTranslations = {
    fr: translationsFr,
    en: translationsEn,
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

    if (isPlatformBrowser(this.platformId)) {
      return this.http.get(`/locale/messages.${locale}.json`).pipe(
        tap((translations) => this.cache.set(cacheKey, translations)),
        catchError((error) => {
          console.error(`Failed to load translations for ${locale}:`, error);
          return of({});
        })
      );
    } else {
      const translations =
        this.staticTranslations[
          locale as keyof typeof this.staticTranslations
        ] || {};
      this.cache.set(cacheKey, translations);
      return of(translations);
    }
  }
}
