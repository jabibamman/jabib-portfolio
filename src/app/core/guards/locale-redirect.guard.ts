import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocaleRoutingService } from '../services/locale-routing.service';

/**
 * Guard to redirect routes without locale prefix to the appropriate locale
 * Example: /cv -> /fr/cv or /en/cv
 */
export const localeRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localeRouting = inject(LocaleRoutingService);

  const currentPath = state.url;
  const currentLocale = localeRouting.getCurrentLocale();

  // Check if path already has a locale prefix
  const hasLocalePrefix = /^\/(fr|en)(\/|$)/.test(currentPath);

  if (!hasLocalePrefix && currentPath !== '/') {
    // Redirect to the same path with locale prefix
    const localizedPath = `/${currentLocale}${currentPath}`;
    router.navigateByUrl(localizedPath);
    return false;
  }

  return true;
};
