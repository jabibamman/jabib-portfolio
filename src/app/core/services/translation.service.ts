import { Injectable, Inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationLoaderService } from './translation-loader.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations$ = new BehaviorSubject<any>({});
  private currentLocale: string;
  private readonly currentLocaleSubject = new BehaviorSubject<string>('fr');
  currentLang$ = this.currentLocaleSubject.asObservable();
  private isInitialized = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCALE_ID) locale: string,
    @Inject(PLATFORM_ID) private platformId: Object,
    private translationLoader: TranslationLoaderService
  ) {
    const urlLocale = this.getLocaleFromUrl();

    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage');
      this.currentLocale = urlLocale || savedLang || locale || 'fr';
    } else {
      this.currentLocale = urlLocale || locale || 'fr';
    }
    this.currentLocaleSubject.next(this.currentLocale);

    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const newLocale = this.getLocaleFromUrl();
          if (newLocale && newLocale !== this.currentLocale) {
            this.currentLocale = newLocale;
            this.currentLocaleSubject.next(newLocale);
            this.loadTranslations();

            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('preferredLanguage', newLocale);
            }
          }
        });
    }
  }

  private getLocaleFromUrl(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      if (path.startsWith('/fr')) return 'fr';
      if (path.startsWith('/en')) return 'en';
    }
    return null;
  }

  init(): Promise<void> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    return this.translationLoader
      .loadTranslations(this.currentLocale)
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
    this.translationLoader.loadTranslations(this.currentLocale).subscribe(translations => {
      this.translations$.next(translations);
    });
  }

  translate(key: string, params?: any): Observable<string> {
    return this.translations$.pipe(
      map(translations => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
          if (value && value[k]) {
            value = value[k];
          } else {
            return key;
          }
        }

        if (params && typeof value === 'string') {
          Object.keys(params).forEach(param => {
            value = value.replace(`{{${param}}}`, params[param]);
          });
        }

        return value;
      })
    );
  }

  instant(key: string, params?: any): string {
    const translations = this.translations$.value;
    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (params && typeof value === 'string') {
      Object.keys(params).forEach(param => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }

    return value;
  }

  setLocale(locale: string): void {
    this.currentLocale = locale;
    this.currentLocaleSubject.next(locale);

    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem('preferredLanguage', locale);
    }

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
