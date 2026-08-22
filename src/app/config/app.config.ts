import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { appRoutes } from '../routes/app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import {
  LucideAngularModule,
  Home,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  ChevronRight,
  Globe,
} from 'lucide-angular';
import { TranslationService } from '../core/services/translation.service';

export function initializeTranslations(translationService: TranslationService) {
  return () => translationService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(CoreModule),
    importProvidersFrom(
      LucideAngularModule.pick({
        Home,
        Mail,
        Github,
        Linkedin,
        Sun,
        Moon,
        ChevronRight,
        Globe,
      })
    ),
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslationService],
      multi: true,
    },
  ],
};
