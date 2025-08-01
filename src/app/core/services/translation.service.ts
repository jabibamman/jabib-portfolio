import { Injectable, Inject, LOCALE_ID, PLATFORM_ID, APP_INITIALIZER } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { map, shareReplay, catchError, switchMap } from "rxjs/operators";
import { isPlatformBrowser } from "@angular/common";
import { TranslationLoaderService } from './translation-loader.service';

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private translations$ = new BehaviorSubject<any>({});
  private currentLocale: string;
  private currentLocaleSubject = new BehaviorSubject<string>("fr");
  currentLang$ = this.currentLocaleSubject.asObservable();
  private isInitialized = false;

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) locale: string,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translationLoader: TranslationLoaderService
  ) {
    this.currentLocale = locale || "fr";
    this.currentLocaleSubject.next(this.currentLocale);
  }

  init(): Promise<void> {
    if (this.isInitialized) {
      return Promise.resolve();
    }
    
    return this.translationLoader.loadTranslations(this.currentLocale)
      .toPromise()
      .then(translations => {
        this.translations$.next(translations || {});
        this.isInitialized = true;
      })
      .catch(error => {
        console.error('Failed to initialize translations:', error);
        this.translations$.next({});
        this.isInitialized = true;
      });
  }

  private loadTranslations(): void {
    this.translationLoader.loadTranslations(this.currentLocale)
      .subscribe((translations) => {
        this.translations$.next(translations);
      });
  }

  translate(key: string, params?: any): Observable<string> {
    return this.translations$.pipe(
      map((translations) => {
        const keys = key.split(".");
        let value = translations;

        for (const k of keys) {
          if (value && value[k]) {
            value = value[k];
          } else {
            return key;
          }
        }

        if (params && typeof value === "string") {
          Object.keys(params).forEach((param) => {
            value = value.replace(`{{${param}}}`, params[param]);
          });
        }

        return value;
      })
    );
  }

  instant(key: string, params?: any): string {
    const translations = this.translations$.value;
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (params && typeof value === "string") {
      Object.keys(params).forEach((param) => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }

    return value;
  }

  setLocale(locale: string): void {
    this.currentLocale = locale;
    this.currentLocaleSubject.next(locale);
    this.loadTranslations();
  }

  setLanguage(lang: string): void {
    this.setLocale(lang);
  }

  get currentLang(): string {
    return this.currentLocale;
  }

  getLocale(): string {
    return this.currentLocale;
  }
}
