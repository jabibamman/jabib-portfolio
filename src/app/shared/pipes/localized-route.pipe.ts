import { Pipe, PipeTransform } from '@angular/core';
import { LocaleRoutingService } from '../../core/services/locale-routing.service';

/**
 * Pipe to add locale prefix to routes
 * Usage: routerLink="{{ '/cv' | localizedRoute }}"
 * Output: /fr/cv or /en/cv depending on current locale
 */
@Pipe({
  name: 'localizedRoute',
  standalone: true,
})
export class LocalizedRoutePipe implements PipeTransform {
  constructor(private localeRouting: LocaleRoutingService) {}

  transform(route: string): string {
    const currentLocale = this.localeRouting.getCurrentLocale();

    const cleanRoute = route.startsWith('/') ? route.substring(1) : route;

    return `/${currentLocale}/${cleanRoute}`;
  }
}
