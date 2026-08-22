import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { LocaleRoutingService } from './locale-routing.service';

/**
 * Service to handle navigation with locale awareness
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private router: Router,
    private location: Location,
    private localeRouting: LocaleRoutingService
  ) {}

  /**
   * Navigate to a route with the current locale prefix
   * @param path - The path without locale (e.g., '/wip', 'wip', or '')
   */
  navigateTo(path: string): Promise<boolean> {
    const currentLocale = this.localeRouting.getCurrentLocale();

    let cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const localizedPath = cleanPath ? `/${currentLocale}/${cleanPath}` : `/${currentLocale}`;

    return this.router.navigateByUrl(localizedPath);
  }

  /**
   * Navigate back to home with current locale
   */
  navigateBack(): void {
    this.navigateHome();
  }

  /**
   * Navigate back to home with current locale
   */
  navigateHome(): Promise<boolean> {
    return this.navigateTo('');
  }

  /**
   * Get a localized route path
   * @param path - The path without locale
   * @returns The full path with locale prefix
   */
  getLocalizedPath(path: string): string {
    const currentLocale = this.localeRouting.getCurrentLocale();
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return cleanPath ? `/${currentLocale}/${cleanPath}` : `/${currentLocale}`;
  }
}
