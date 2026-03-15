import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const Calendly: any;

@Injectable({ providedIn: 'root' })
export class CalendlyService {
  private readonly url = 'https://calendly.com/jabibamman/30min';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openPopup(): void {
    if (isPlatformBrowser(this.platformId) && typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({ url: this.url });
    }
  }
}
