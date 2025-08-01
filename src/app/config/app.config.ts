import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { appRoutes } from "../routes/app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { CoreModule } from "../core/core.module";
import { LucideAngularModule, Calendar, Code, Code2, Cloud, GraduationCap, Sparkles, Zap, MessageSquare, Lightbulb, Rocket, CheckCircle, User, Briefcase, Heart, ArrowRight, Mail, Github, Linkedin, Send } from "lucide-angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(),
    importProvidersFrom(CoreModule),
    importProvidersFrom(LucideAngularModule.pick({ 
      Calendar, Code, Code2, Cloud, GraduationCap, Sparkles, Zap, 
      MessageSquare, Lightbulb, Rocket, CheckCircle, 
      User, Briefcase, Heart, ArrowRight, 
      Mail, Github, Linkedin, Send 
    })),
  ],
};
