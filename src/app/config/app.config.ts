import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  APP_INITIALIZER,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch } from "@angular/common/http";

import { appRoutes } from "../routes/app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { CoreModule } from "../core/core.module";
import { LucideAngularModule, Calendar, Code, Code2, Cloud, GraduationCap, Sparkles, Zap, MessageSquare, Lightbulb, Rocket, CheckCircle, User, Briefcase, Heart, ArrowRight, ArrowLeft, Mail, Github, Linkedin, Send } from "lucide-angular";
import { TranslationService } from "../core/services/translation.service";

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
    importProvidersFrom(LucideAngularModule.pick({ 
      Calendar, Code, Code2, Cloud, GraduationCap, Sparkles, Zap, 
      MessageSquare, Lightbulb, Rocket, CheckCircle, 
      User, Briefcase, Heart, ArrowRight, ArrowLeft,
      Mail, Github, Linkedin, Send 
    })),
    TranslationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslationService],
      multi: true
    }
  ],
};
