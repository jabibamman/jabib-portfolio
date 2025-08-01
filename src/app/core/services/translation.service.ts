import { Injectable, Inject, LOCALE_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private translations$ = new BehaviorSubject<any>({});
  private currentLocale: string;
  private currentLocaleSubject = new BehaviorSubject<string>("fr");
  currentLang$ = this.currentLocaleSubject.asObservable();

  constructor(private http: HttpClient, @Inject(LOCALE_ID) locale: string) {
    this.currentLocale = locale || "fr";
    this.currentLocaleSubject.next(this.currentLocale);
    this.loadTranslations();
  }

  private loadTranslations(): void {
    this.http
      .get(`/locale/messages.${this.currentLocale}.json`)
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
