import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleRoutingService } from '../../core/services/locale-routing.service';

/**
 * Directive to automatically add locale prefix to routerLink
 * Usage: <a localizedRouterLink="/cv">CV</a>
 * Will navigate to /fr/cv or /en/cv depending on current locale
 */
@Directive({
  selector: '[localizedRouterLink]',
  standalone: true,
})
export class LocalizedRouterLinkDirective implements OnInit {
  @Input() localizedRouterLink: string = '';

  constructor(
    private router: Router,
    private localeRouting: LocaleRoutingService
  ) {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();

    const currentLocale = this.localeRouting.getCurrentLocale();

    const cleanRoute = this.localizedRouterLink.startsWith('/')
      ? this.localizedRouterLink.substring(1)
      : this.localizedRouterLink;

    const localizedPath = `/${currentLocale}/${cleanRoute}`;
    this.router.navigateByUrl(localizedPath);
  }
}
